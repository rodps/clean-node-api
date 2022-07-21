export interface AuthenticateParams {
  email: string
  password: string
}

interface AccessToken {
  accessToken?: string
  err?: never
}

interface Error {
  accessToken?: never
  err: AuthenticateErrors
}

export type AccessTokenOrError = AccessToken | Error

export enum AuthenticateErrors {
  EMAIL_NOT_REGISTERED,
  INCORRECT_PASSWORD
}

export interface AuthenticateUseCase {
  exec: (params: AuthenticateParams) => Promise<AccessTokenOrError>
}
