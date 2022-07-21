import { AccessTokenPayload } from './access-token-generator'

export interface TokenVerifier {
  verify: (token: string) => Promise<AccessTokenPayload | null>
}
