import { CreateUserRepository } from '@/domain/ports/repositories/create-user-repository'
import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'
import { CheckEmailExistsRepository } from '../ports/repositories/check-email-exists-repository'
import { CreateAccountParams, CreateAccountUseCase, IdOrError } from '../ports/usecases/create-account-usecase'

export class CreateAccount implements CreateAccountUseCase {
  constructor (
    private readonly createUserRepo: CreateUserRepository,
    private readonly checkEmailExistsRepository: CheckEmailExistsRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async exec (params: CreateAccountParams): Promise<IdOrError> {
    const { name, email } = params

    const emailAlreadyExists = await this.checkEmailExistsRepository.check(email)
    if (emailAlreadyExists) return { err: 'This email is already in use' }

    const password = this.passwordHasher.hash(params.password)
    const id = await this.createUserRepo.create({ name, email, password })
    return { id }
  }
}
