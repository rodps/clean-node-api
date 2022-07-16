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
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const password = faker.internet.password()
    test('should call hash with correct values', async () => {
      const sut = makeSut()
      await sut.hash(password)
      expect(hashSpy).toHaveBeenCalledWith(password, salt)
    })

    test('should return hash on success', async () => {
      const sut = makeSut()
      const result = await sut.hash(password)
      expect(result).toBe('hash')
    })

    test('should throw if bcrypt hash throws', async () => {
      const sut = makeSut()
      hashSpy.mockImplementationOnce(() => {
        throw new Error()
      })
      expect(sut.hash(password)).rejects.toThrow()
    })
  })

  describe('compare', () => {
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    const plainText = 'any_text'
    const hashed = 'hashed_text'
    test('should call compare with correct values', async () => {
      const sut = makeSut()
      await sut.compare(plainText, hashed)
      expect(compareSpy).toHaveBeenCalledWith(plainText, hashed)
    })

    test('should return true on success', async () => {
      const sut = makeSut()
      const result = await sut.compare(plainText, hashed)
      expect(result).toBe(true)
    })

    test('should return false on failure', async () => {
      const sut = makeSut()
      compareSpy.mockImplementationOnce(() => false)
      const result = await sut.compare(plainText, hashed)
      expect(result).toBe(false)
    })

    test('should throw if bcrypt compare throws', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      compareSpy.mockImplementationOnce(() => {
        throw new Error()
      })
      expect(sut.compare(plainText, hashed)).rejects.toThrow()
    })
  })
})
