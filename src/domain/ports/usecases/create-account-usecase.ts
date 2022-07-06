import { Either } from 'fp-ts/lib/Either'

export interface CreateAccountParams {
  name: string
  email: string
  password: string
}

export enum CreateAccountErrors {
  EMAIL_ALREADY_EXISTS
}

export interface CreateAccountUseCase {
  exec: (params: CreateAccountParams) => Promise<Either<CreateAccountErrors, string>>
}
