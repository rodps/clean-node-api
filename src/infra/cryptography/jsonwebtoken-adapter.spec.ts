import jwt from 'jsonwebtoken'
import { JWTAdapter } from './jsonwebtoken-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: (): string => {
    return 'any_token'
  }
}))

describe('Jwt Adapter', () => {
  test('should return a token if jwt succeeds', () => {
    const sut = new JWTAdapter('secret')
    const result = sut.generate({ id: 'any_id', userName: 'any_name' })
    expect(result).toBe('any_token')
  })

  test('should call jwt with correct values', () => {
    const sut = new JWTAdapter('secret')
    const payload = { id: 'any_id', userName: 'any_name' }
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.generate(payload)
    expect(signSpy).toHaveBeenCalledWith(payload, 'secret')
  })
})
