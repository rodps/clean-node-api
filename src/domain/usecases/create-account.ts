import { CreateUserRepository } from '@/domain/ports/repositories/create-user-repository'
import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'
import { CheckEmailExistsRepository } from '../ports/repositories/check-email-exists-repository'
import { CreateAccountErrors, CreateAccountParams, CreateAccountUseCase } from '../ports/usecases/create-account-usecase'
import { Either, left, right } from 'fp-ts/lib/Either'

export class CreateAccount implements CreateAccountUseCase {
  constructor (
    private readonly createUserRepo: CreateUserRepository,
    private readonly checkEmailExistsRepository: CheckEmailExistsRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async exec (params: CreateAccountParams): Promise<Either<CreateAccountErrors, string>> {
    const { name, email } = params

    const emailAlreadyExists = await this.checkEmailExistsRepository.checkEmail(email)
    if (emailAlreadyExists) return left(CreateAccountErrors.EMAIL_ALREADY_EXISTS)

    const password = this.passwordHasher.hash(params.password)
    const id = await this.createUserRepo.create({ name, email, password })
    return right(id)
  }
}
