import { CreateUserRepository } from '@/domain/ports/repositories/create-user-repository'
import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'
import { IdGenerator } from '../ports/id/id-generator'
import { CheckEmailExistsRepository } from '../ports/repositories/check-email-exists-repository'
import { ResultOrError } from '../response/result-or-error'

export interface CreateAccountParams {
  name: string
  email: string
  password: string
}

export interface CreateAccountResult {
  id: string
}

export class CreateAccount {
  constructor (
    private readonly createUserRepo: CreateUserRepository,
    private readonly checkEmailExistsRepository: CheckEmailExistsRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly idGenerator: IdGenerator
  ) {}

  async exec (params: CreateAccountParams): Promise<ResultOrError<CreateAccountResult, string>> {
    const { name, email } = params

    const emailAlreadyExists = await this.checkEmailExistsRepository.check(email)
    if (emailAlreadyExists) return { err: 'This email is already in use' }

    const password = this.passwordHasher.hash(params.password)
    const id = this.idGenerator.generate()
    const createdAt = new Date()
    await this.createUserRepo.create({ id, name, email, password, createdAt })
    return { res: { id } }
  }
}
