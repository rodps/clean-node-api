export interface CreateAccountParams {
  name: string
  email: string
  password: string
}

export interface IdOrError {
  id?: string
  err?: CreateAccountErrors
}

export enum CreateAccountErrors {
  EMAIL_ALREADY_EXISTS
}

export interface CreateAccountUseCase {
  exec: (params: CreateAccountParams) => Promise<IdOrError>
}
