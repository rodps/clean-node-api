import { AccessTokenPayload } from '../ports/crypt/access-token-generator'
import { TokenVerifier } from '../ports/crypt/token-verifier'
import { Authorize } from './authorize'

class TokenVerifierSpy implements TokenVerifier {
  result: AccessTokenPayload | null = {
    id: 'any_id',
    userName: 'any_name'
  }

  token: string

  async verify (token: string): Promise<AccessTokenPayload | null> {
    this.token = token
    return this.result
  }
}

describe('Authorize use case', () => {
  test('should call TokenVerifier with correct values', async () => {
    const tokenVerifierSpy = new TokenVerifierSpy()
    const sut = new Authorize(tokenVerifierSpy, 'any_role')
    await sut.exec('any_token')
    expect(tokenVerifierSpy.token).toBe('any_token')
  })
})
