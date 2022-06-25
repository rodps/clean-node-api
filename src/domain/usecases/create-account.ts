import { UserProps } from '../entities/user'
import { CreateUserRepository } from '../ports/repositories/create-user-repository'
import { PasswordHasher } from '../ports/utils/password-hasher'

export class CreateAccount {
  constructor (
    readonly createUserRepo: CreateUserRepository,
    readonly passwordHasher: PasswordHasher
  ) {}

  async exec (user: UserProps): Promise<boolean> {
    const hashedPassword = this.passwordHasher.hash(user.password)
    return await this.createUserRepo.create({
      name: user.name,
      email: user.email,
      password: hashedPassword
    })
  }
}
