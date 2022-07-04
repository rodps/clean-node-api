import { CreateAccountSpy } from '@/../tests/mocks/domain/ports/usecases/create-account-spy'
import { EmailValidatorSpy } from '@/../tests/mocks/presentation/validators/email-validator-spy'
import { CreateAccountParams } from '@/domain/ports/usecases/create-account-usecase'
import { CreateAccountController } from './create-account-controller'
import faker from 'faker'

interface SutTypes {
  createAccountSpy: CreateAccountSpy
  emailValidatorSpy: EmailValidatorSpy
  sut: CreateAccountController
}

const makeSut = (): SutTypes => {
  const createAccountSpy = new CreateAccountSpy()
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new CreateAccountController(createAccountSpy, emailValidatorSpy)
  return {
    createAccountSpy,
    emailValidatorSpy,
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
    expect(createAccountSpy.params).toEqual(fakeAccount)
  })

  test('should return httpResponse status created if no error occurs', async () => {
    const { sut, createAccountSpy, emailValidatorSpy } = makeSut()
    createAccountSpy.result.id = faker.datatype.uuid()
    emailValidatorSpy.result = true
    const userId = createAccountSpy.result.id
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
})
