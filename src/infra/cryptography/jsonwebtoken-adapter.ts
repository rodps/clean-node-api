import { AccessTokenGenerator, AccessTokenPayload } from '@/domain/ports/crypt/access-token-generator'
import jwt from 'jsonwebtoken'

export class JWTAdapter implements AccessTokenGenerator {
  constructor (private readonly secret: string) {}
  generate (payload: AccessTokenPayload): string {
    return jwt.sign(payload, this.secret)
  }
}
