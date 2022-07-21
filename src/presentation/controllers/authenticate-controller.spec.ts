import { AuthenticateSpy } from '@/../tests/mocks/domain/ports/usecases/authenticate-spy'
import { ValidatorSpy } from '@/../tests/mocks/presentation/validator-spy'
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
})
