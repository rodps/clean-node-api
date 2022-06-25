import { UserProps } from '../entities/user'
import { CreateUserRepository } from '../ports/repositories/create-user-repository'
import { PasswordHasher } from '../ports/utils/password-hasher'

export class CreateAccount {
  constructor (
    readonly createUserRepo: CreateUserRepository,
    readonly passwordHasher: PasswordHasher
  ) {}

  exec (user: UserProps): boolean {
    const hashedPassword = this.passwordHasher.hash(user.password)
    return this.createUserRepo.create({
      name: user.name,
      email: user.email,
      password: hashedPassword
    })
  }
}
