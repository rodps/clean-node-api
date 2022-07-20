import { UserModel } from '@/domain/models/user'
import { LoadUserByEmailRepository } from '@/domain/ports/repositories/load-user-by-email-repository'

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  result: UserModel | null = {
    createdAt: new Date(),
    updatedAt: null,
    email: 'any_email',
    id: 'any_id',
    name: 'any_name',
    password: 'any_password'
  }

  email: string

  async loadByEmail (email: string): Promise<UserModel | null> {
    this.email = email
    return this.result
  }
}
