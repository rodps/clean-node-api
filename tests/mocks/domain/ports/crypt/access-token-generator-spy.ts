import { AccessTokenGenerator, AccessTokenPayload } from '@/domain/ports/crypt/access-token-generator'

export class AccessTokenGeneratorSpy implements AccessTokenGenerator {
  result: string = 'any_token'
  payload: AccessTokenPayload
  generate (payload: AccessTokenPayload): string {
    this.payload = payload
    return this.result
  }
}
