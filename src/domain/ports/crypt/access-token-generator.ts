export interface AccessTokenGeneratorParams {
  id: string
  userName: string
}

export interface AccessTokenGenerator {
  generate: (payload: AccessTokenGeneratorParams) => string
}
