import { CreateAccountParams } from '@/domain/ports/usecases/create-account-usecase'
import { InvalidEmailError } from '../../presentation/errors/invalid-email-error'
import { RequiredFieldError } from '../../presentation/errors/required-field-error'
import { CreateAccountValidator } from './create-account-validator'
import { MinimumLengthError } from '../../presentation/errors/minimum-lenght-error'
import faker from 'faker'

describe('Create account validator', () => {
  const fakeAccount: CreateAccountParams = {
    name: '',
    email: '',
    password: ''
  }
  test('should return an error if no name is provided', () => {
    const sut = new CreateAccountValidator()
    const result = sut.validate(fakeAccount)
    expect(result).toContainEqual(new RequiredFieldError('name'))
  })

  test('should return an error if no email is provided', () => {
    const sut = new CreateAccountValidator()
    const result = sut.validate(fakeAccount)
    expect(result).toContainEqual(new RequiredFieldError('email'))
  })

  test('should return an error if no password is provided', () => {
    const sut = new CreateAccountValidator()
    const result = sut.validate(fakeAccount)
    expect(result).toContainEqual(new RequiredFieldError('password'))
  })

  test('should return an error if email is invalid', () => {
    const sut = new CreateAccountValidator()
    const accountWithInvalidEmail: CreateAccountParams = {
      name: 'any_name',
      email: 'invalid_email',
      password: 'any_password'
    }
    const result = sut.validate(accountWithInvalidEmail)
    expect(result).toContainEqual(new InvalidEmailError('email'))
  })

  test('should return an error if password length is less than 6 characters', () => {
    const sut = new CreateAccountValidator()
    const accountWithShortPassword: CreateAccountParams = {
      name: 'any_name',
      email: faker.internet.email(),
      password: '12345'
    }
    const result = sut.validate(accountWithShortPassword)
    expect(result).toContainEqual(new MinimumLengthError('password', 6))
  })

  test('should return null if no errors occur', () => {
    const sut = new CreateAccountValidator()
    const accountWithoutErrors: CreateAccountParams = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    const result = sut.validate(accountWithoutErrors)
    expect(result).toBeNull()
  })
})
