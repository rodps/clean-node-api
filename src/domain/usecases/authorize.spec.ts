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

interface SutTypes {
  tokenVerifierSpy: TokenVerifierSpy
  sut: Authorize
}

const makeSut = (): SutTypes => {
  const tokenVerifierSpy = new TokenVerifierSpy()
  const sut = new Authorize(tokenVerifierSpy, 'any_role')
  return {
    tokenVerifierSpy,
    sut
  }
}

describe('Authorize use case', () => {
  test('should call TokenVerifier with correct values', async () => {
    const { tokenVerifierSpy, sut } = makeSut()
    await sut.exec('any_token')
    expect(tokenVerifierSpy.token).toBe('any_token')
  })

  test('should return null if TokenVerifier returns null', async () => {
    const { tokenVerifierSpy, sut } = makeSut()
    tokenVerifierSpy.result = null
    const payload = await sut.exec('any_token')
    expect(payload).toBe(null)
  })
})
