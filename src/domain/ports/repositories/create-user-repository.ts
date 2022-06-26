import { UserModel } from '@/domain/models/user'

export interface CreateUserRepository {
  create: (user: UserModel) => Promise<boolean>
}
