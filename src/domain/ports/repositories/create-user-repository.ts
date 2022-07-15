import { CreateAccountParams } from '../usecases/create-account-usecase'

export interface CreateUserRepository {
  create: (user: CreateAccountParams) => Promise<string>
}
