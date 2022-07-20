export interface AuthorizeParams {
  email: string
  password: string
}

interface AccessToken {
  accessToken?: string
  err?: never
}

interface Error {
  accessToken?: never
  err: AuthorizeErrors
}

export type AccessTokenOrError = AccessToken | Error

export enum AuthorizeErrors {
  EMAIL_NOT_REGISTERED,
  INCORRECT_PASSWORD
}

export interface AuthorizeUseCase {
  exec: (params: AuthorizeParams) => Promise<AccessTokenOrError>
}
