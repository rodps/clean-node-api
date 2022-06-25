import { UserProps } from '@/domain/entities/user'

export interface CreateUserRepository {
  create: (user: UserProps) => Promise<boolean>
}
