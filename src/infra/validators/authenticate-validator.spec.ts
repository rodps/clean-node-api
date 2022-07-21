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
})
