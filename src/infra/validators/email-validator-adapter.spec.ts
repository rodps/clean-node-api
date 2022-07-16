import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator-adapter'

jest.mock('validator', () => ({
  isEmail: (): boolean => {
    return true
  }
}))

describe('Email validator adapter', () => {
  const isEmailSpy = jest.spyOn(validator, 'isEmail')
  test('should call isEmail with correct values', () => {
    const sut = new EmailValidatorAdapter()
    const email = 'any_email'
    sut.isValid(email)
    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })

  test('should return true if email is valid', () => {
    const sut = new EmailValidatorAdapter()
    const email = 'any_email'
    isEmailSpy.mockReturnValueOnce(true)
    expect(sut.isValid(email)).toBe(true)
  })

  test('should return false if email is invalid', () => {
    const sut = new EmailValidatorAdapter()
    const email = 'any_email'
    isEmailSpy.mockReturnValueOnce(false)
    expect(sut.isValid(email)).toBe(false)
  })
})
