import { ValidatorSpy } from '@/../tests/mocks/presentation/validator-spy'
import { AuthenticateUseCase } from '@/domain/ports/usecases/authenticate-usecase'
import { left, right } from 'fp-ts/lib/Either'
import { mock, MockProxy } from 'jest-mock-extended'
import { HttpResponse } from '../protocols/http-response'
import { ValidationError } from '../protocols/validator'
import { AuthenticateController } from './authenticate-controller'

interface SutTypes {
  authenticateSpy: MockProxy<AuthenticateUseCase>
  validatorSpy: ValidatorSpy
  sut: AuthenticateController
}

const makeSut = (): SutTypes => {
  const authenticateSpy = mock<AuthenticateUseCase>()
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
    expect(authenticateSpy.exec).toBeCalledWith({ email: 'any_email', password: 'any_password' })
  })

  test('should return unauthorized if authentication returns error ', async () => {
    const { sut, authenticateSpy } = makeSut()
    authenticateSpy.exec.mockResolvedValue(left({ field: 'any_field', message: 'any message' }))
    const result = await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(result).toEqual(HttpResponse.unauthorized({ field: 'any_field', message: 'any message' }))
  })

  test('should return ok if authentication is successful', async () => {
    const { sut, authenticateSpy } = makeSut()
    authenticateSpy.exec.mockResolvedValue(right({ accessToken: 'any_token' }))
    const result = await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(result).toEqual(HttpResponse.ok({ accessToken: 'any_token' }))
  })

  test('should return server error if any exception occurrs', async () => {
    const { sut, authenticateSpy } = makeSut()
    jest.spyOn(authenticateSpy, 'exec').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle({ email: 'any_email', password: 'any_password' })
    expect(result).toEqual(HttpResponse.serverError())
  })
})
