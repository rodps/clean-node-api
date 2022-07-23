export interface AccessTokenPayload {
  id: string
  role: string
}

export interface AccessTokenGenerator {
  generate: (payload: AccessTokenPayload) => string
}
