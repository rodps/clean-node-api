import { Either } from 'fp-ts/lib/Either'
import { UseCaseError } from '../errors/use-case-error'

export interface AuthenticateParams {
  email: string
  password: string
}

export interface AccessToken {
  accessToken?: string
}

export interface AuthenticateUseCase {
  exec: (params: AuthenticateParams) => Promise<Either<UseCaseError, AccessToken>>
}
