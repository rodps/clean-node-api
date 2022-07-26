import { AccessTokenPayload } from '@/domain/ports/crypt/access-token-generator'
import jwt from 'jsonwebtoken'
import { JWTAdapter } from './jsonwebtoken-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: (): string => {
    return 'any_token'
  },
  verify: (): AccessTokenPayload => {
    return { id: 'any_id', role: 'any_role' }
  }
}))

describe('Jwt Adapter', () => {
  test('should return a token if jwt succeeds', () => {
    const sut = new JWTAdapter('secret')
    const result = sut.generate({ id: 'any_id', role: 'any_role' })
    expect(result).toBe('any_token')
  })

  test('should call jwt with correct values', () => {
    const sut = new JWTAdapter('secret')
    const payload = { id: 'any_id', role: 'any_role' }
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.generate(payload)
    expect(signSpy).toHaveBeenCalledWith(payload, 'secret')
  })

  test('should return payload if verify succeeds', async () => {
    const sut = new JWTAdapter('secret')
    const result = await sut.verify('any_id')
    expect(result).toEqual({ id: 'any_id', role: 'any_role' })
  })
})
