import { CreateUserRepository } from '@/domain/ports/repositories/create-user-repository'
import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'
import { CheckEmailExistsRepository } from '../ports/repositories/check-email-exists-repository'
import { CreateAccountParams, CreateAccountUseCase } from '../ports/usecases/create-account-usecase'
import { Either, left, right } from 'fp-ts/lib/Either'
import { UseCaseError } from '../ports/errors/use-case-error'

export class CreateAccount implements CreateAccountUseCase {
  constructor (
    private readonly createUserRepo: CreateUserRepository,
    private readonly checkEmailExistsRepository: CheckEmailExistsRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async exec (params: CreateAccountParams): Promise<Either<UseCaseError, string>> {
    const { name, email } = params

    const emailAlreadyExists = await this.checkEmailExistsRepository.checkEmail(email)
    if (emailAlreadyExists) return left({ field: 'email', message: 'Email already in use' })

    const password = await this.passwordHasher.hash(params.password)
    const id = await this.createUserRepo.create({ name, email, password })
    return right(id)
  }
}
