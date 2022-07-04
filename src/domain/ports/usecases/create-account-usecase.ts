export interface CreateAccountParams {
  name: string
  email: string
  password: string
}

export interface IdOrError {
  id?: string
  err?: string
}

export interface CreateAccountUseCase {
  exec: (params: CreateAccountParams) => Promise<IdOrError>
}
