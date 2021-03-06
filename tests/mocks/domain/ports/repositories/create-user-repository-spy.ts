import { CreateUserRepository } from '@/domain/ports/repositories/create-user-repository'
import { CreateAccountParams } from '@/domain/ports/usecases/create-account-usecase'
import faker from 'faker'

export class CreateUserRepositorySpy implements CreateUserRepository {
  user: CreateAccountParams
  id: string = faker.datatype.uuid()
  async create (user: CreateAccountParams): Promise<string> {
    this.user = user
    return await Promise.resolve(this.id)
  }
}
