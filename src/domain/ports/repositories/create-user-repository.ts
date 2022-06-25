import { UserProps } from '../../entities/user'

export interface CreateUserRepository {
  create: (user: UserProps) => boolean
}
