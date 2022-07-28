import { CreateAccountParams, CreateAccountUseCase } from '@/domain/ports/usecases/create-account-usecase'
import { CreateAccountController } from './create-account-controller'
import faker from 'faker'
import { left, right } from 'fp-ts/lib/Either'
import { ValidatorSpy } from '@mocks/presentation/validator-spy'
import { HttpResponse } from '../protocols/http-response'
import { ValidationError } from '../protocols/validator'
import { mock, MockProxy } from 'jest-mock-extended'

interface SutTypes {
  createAccountSpy: MockProxy<CreateAccountUseCase>
  validatorSpy: ValidatorSpy
  sut: CreateAccountController
}

const makeSut = (): SutTypes => {
  const createAccountSpy = mock<CreateAccountUseCase>()
  const validatorSpy = new ValidatorSpy()
  const sut = new CreateAccountController(
    createAccountSpy,
    validatorSpy
  )
  return {
    createAccountSpy,
    validatorSpy,
    sut
  }
}

const fakeAccount: CreateAccountParams = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

describe('Create account controller', () => {
  test('should call createAccount with correct values', async () => {
    const { sut, createAccountSpy } = makeSut()
    await sut.handle(fakeAccount)
    expect(createAccountSpy.exec).toHaveBeenCalledWith(fakeAccount)
  })

  test('should return httpResponse status created if no error occurs', async () => {
    const { sut, createAccountSpy } = makeSut()
    const userId = faker.datatype.uuid()
    createAccountSpy.exec.mockResolvedValue(right(userId))
    const response = await sut.handle(fakeAccount)
    expect(response.statusCode).toBe(201)
    expect(response.header?.location).toBe(`/users/${userId}`)
  })

  test('should return serverError if createAccount throws', async () => {
    const { sut, createAccountSpy } = makeSut()
    jest.spyOn(createAccountSpy, 'exec').mockImplementation(() => {
      throw new Error()
    })
    const response = await sut.handle(fakeAccount)
    expect(response.statusCode).toBe(500)
  })

  test('should return unprocessable entity if createAccount returns error', async () => {
    const { sut, createAccountSpy } = makeSut()
    createAccountSpy.exec.mockResolvedValue(left({ field: 'any_field', message: 'any message' }))
    const response = await sut.handle(fakeAccount)
    expect(response).toEqual(HttpResponse.unprocessableEntity({ field: 'any_field', message: 'any message' }))
  })

  test('should return badRequest if validator returns error', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.result = [new ValidationError('any_field', 'any_message')]
    const response = await sut.handle(fakeAccount)
    expect(response).toEqual(HttpResponse.badRequest(validatorSpy.result))
  })

  test('should call validator with correct values', async () => {
    const { sut, validatorSpy } = makeSut()
    await sut.handle(fakeAccount)
    expect(validatorSpy.params).toBe(fakeAccount)
  })
})
