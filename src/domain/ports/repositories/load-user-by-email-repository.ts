import { UserModel } from '@/domain/models/user'

export interface LoadUserByEmailRepository {
  load: (email: string) => UserModel | null
}
