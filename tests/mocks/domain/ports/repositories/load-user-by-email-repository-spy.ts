import { UserModel } from '@/domain/models/user'
import { LoadUserByEmailRepository } from '@/domain/ports/repositories/load-user-by-email'

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  result: UserModel | null = {
    createdAt: new Date(),
    email: 'any_email',
    id: 'any_id',
    name: 'any_name',
    password: 'any_password'
  }

  load (email: string): UserModel | null {
    return this.result
  }
}
