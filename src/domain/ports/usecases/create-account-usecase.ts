import { Either } from 'fp-ts/lib/Either'
import { UseCaseError } from '../errors/use-case-error'

export interface CreateAccountParams {
  name: string
  email: string
  password: string
}

export interface CreateAccountUseCase {
  exec: (params: CreateAccountParams) => Promise<Either<UseCaseError, string>>
}
