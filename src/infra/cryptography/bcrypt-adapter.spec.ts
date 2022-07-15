import { BcryptAdapter } from './bcrypt-adapter'
import faker from 'faker'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash'
  },

  async compare (): Promise<boolean> {
    return true
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt adapter', () => {
  test('should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const password = faker.internet.password()
    await sut.hash(password)
    expect(hashSpy).toHaveBeenCalledWith(password, salt)
  })
})
