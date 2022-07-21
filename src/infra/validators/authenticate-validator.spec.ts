import { AuthenticateParams } from '@/domain/ports/usecases/authenticate-usecase'
import { RequiredFieldError } from '@/presentation/errors/required-field-error'
import { AuthenticateValidator } from './authenticate-validator'

describe('Authenticate validator', () => {
  const fakeAutentication: AuthenticateParams = {
    email: '',
    password: ''
  }
  test('should return error if no email is provided', () => {
    const sut = new AuthenticateValidator()
    const error = sut.validate(fakeAutentication)
    expect(error).toContainEqual(new RequiredFieldError('email'))
  })

  test('should return error if no password is provided', () => {
    const sut = new AuthenticateValidator()
    const error = sut.validate(fakeAutentication)
    expect(error).toContainEqual(new RequiredFieldError('password'))
  })

  test('should return null if no error occurs', () => {
    const validAuthentication: AuthenticateParams = {
      email: 'any_email',
      password: 'any_password'
    }
    const sut = new AuthenticateValidator()
    const error = sut.validate(validAuthentication)
    expect(error).toBe(null)
  })
})
