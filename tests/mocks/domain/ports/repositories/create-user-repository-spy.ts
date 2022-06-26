import { UserModel } from '@/domain/models/user'
import { CreateUserRepository } from '@/domain/ports/repositories/create-user-repository'

export class CreateUserRepositorySpy implements CreateUserRepository {
  user: UserModel
  async create (user: UserModel): Promise<boolean> {
    this.user = user
    return true
  }
}
