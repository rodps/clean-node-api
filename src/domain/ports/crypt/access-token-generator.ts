export interface AccessTokenPayload {
  id: string
  userName: string
}

export interface AccessTokenGenerator {
  generate: (payload: AccessTokenPayload) => string
}
