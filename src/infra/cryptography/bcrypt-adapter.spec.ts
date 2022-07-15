/* eslint-disable @typescript-eslint/no-floating-promises */
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
  describe('hash', () => {
    test('should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      const password = faker.internet.password()
      await sut.hash(password)
      expect(hashSpy).toHaveBeenCalledWith(password, salt)
    })

    test('should return hash on success', async () => {
      const sut = makeSut()
      const password = faker.internet.password()
      const result = await sut.hash(password)
      expect(result).toBe('hash')
    })

    test('should throw if bcrypt throws', async () => {
      const sut = makeSut()
      const password = faker.internet.password()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      hashSpy.mockImplementation(() => {
        throw new Error()
      })
      expect(sut.hash(password)).rejects.toThrow()
    })
  })
})
