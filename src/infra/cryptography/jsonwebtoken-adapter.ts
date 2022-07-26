import { AccessTokenGenerator, AccessTokenPayload } from '@/domain/ports/crypt/access-token-generator'
import { TokenVerifier } from '@/domain/ports/crypt/token-verifier'
import jwt from 'jsonwebtoken'

export class JWTAdapter implements AccessTokenGenerator, TokenVerifier {
  constructor (private readonly secret: string) {}
  generate (payload: AccessTokenPayload): string {
    return jwt.sign(payload, this.secret)
  }

  async verify (token: string): Promise<AccessTokenPayload | null> {
    try {
      const payload = jwt.verify(token, this.secret) as jwt.JwtPayload & AccessTokenPayload
      return { id: payload.id, role: payload.role }
    } catch {
      return null
    }
  }
}
