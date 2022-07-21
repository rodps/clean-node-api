import { AuthenticateSpy } from '@/../tests/mocks/domain/ports/usecases/authenticate-spy'
import { ValidatorSpy } from '@/../tests/mocks/presentation/validator-spy'
import { AuthenticateErrors } from '@/domain/ports/usecases/authenticate-usecase'
import { EmailNotRegisteredError } from '../errors/email-not-registered-error'
import { IncorrectPasswordError } from '../errors/incorrect-password-error'
import { HttpResponse } from '../protocols/http-response'
import { ValidationError } from '../protocols/validator'
import { AuthenticateController } from './authenticate-controller'

interface SutTypes {
  authenticateSpy: AuthenticateSpy
  validatorSpy: ValidatorSpy
  sut: AuthenticateController
}

const makeSut = (): SutTypes => {
  const authenticateSpy = new AuthenticateSpy()
  const validatorSpy = new ValidatorSpy()
  const sut = new AuthenticateController(authenticateSpy, validatorSpy)

  return {
    authenticateSpy,
    validatorSpy,
    sut
  }
}

describe('Authenticate controller', () => {
  test('should call validator with correct params', async () => {
    const { sut, validatorSpy } = makeSut()
    await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(validatorSpy.params).toEqual({ email: 'any_email', password: 'any_password' })
  })

  test('should return bad request if validation fails', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.result = [new ValidationError('any_field', 'any_message')]
    const result = await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(result).toEqual(HttpResponse.badRequest(validatorSpy.result))
  })

  test('should call authenticate with correct values', async () => {
    const { sut, authenticateSpy } = makeSut()
    await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(authenticateSpy.params).toEqual({ email: 'any_email', password: 'any_password' })
  })

  test('should return unauthorized if authentication returns EMAIL_NOT_REGISTERED ', async () => {
    const { sut, authenticateSpy } = makeSut()
    authenticateSpy.result = { err: AuthenticateErrors.EMAIL_NOT_REGISTERED }
    const result = await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(result).toEqual(HttpResponse.unauthorized([new EmailNotRegisteredError('email')]))
  })

  test('should return unauthorized if authentication returns INCORRECT_PASSWORD', async () => {
    const { sut, authenticateSpy } = makeSut()
    authenticateSpy.result = { err: AuthenticateErrors.INCORRECT_PASSWORD }
    const result = await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(result).toEqual(HttpResponse.unauthorized([new IncorrectPasswordError('password')]))
  })
})
