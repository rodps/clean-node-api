import { UserProps } from '../entities/user'
import { CreateUserRepository } from '../ports/repositories/create-user-repository'

export class CreateAccount {
  constructor (readonly createUserRepo: CreateUserRepository) {}

  exec (user: UserProps): boolean {
    return this.createUserRepo.create(user)
  }
}
