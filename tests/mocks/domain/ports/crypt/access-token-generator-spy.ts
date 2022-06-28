import { AccessTokenGenerator, AccessTokenGeneratorParams } from '@/domain/ports/crypt/access-token-generator'

export class AccessTokenGeneratorSpy implements AccessTokenGenerator {
  result: string = 'any_token'
  payload: AccessTokenGeneratorParams
  generate (payload: AccessTokenGeneratorParams): string {
    this.payload = payload
    return this.result
  }
}
