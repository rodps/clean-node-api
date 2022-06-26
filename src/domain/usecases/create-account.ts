import { CreateUserRepository } from '@/domain/ports/repositories/create-user-repository'
import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'
import { IdGenerator } from '../ports/id/id-generator'

export interface CreateAccountParams {
  name: string
  email: string
  password: string
}

export class CreateAccount {
  constructor (
    private readonly createUserRepo: CreateUserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly idGenerator: IdGenerator
  ) {}

  async exec (params: CreateAccountParams): Promise<boolean> {
    const { name, email } = params
    const password = this.passwordHasher.hash(params.password)
    const id = this.idGenerator.generate()
    const createdAt = new Date()
    return await this.createUserRepo.create({ id, name, email, password, createdAt })
  }
}
