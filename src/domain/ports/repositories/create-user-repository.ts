import { CreateAccountParams } from '@/domain/usecases/create-account'

export interface CreateUserRepository {
  create: (user: CreateAccountParams) => Promise<string>
}
