import { CreateAccount } from './create-account'
import { CreateUserRepositorySpy } from '@mocks/domain/ports/repositories/create-user-repository-spy'
import { PasswordHasherSpy } from '@/../tests/mocks/domain/ports/crypt/password-hasher-spy'
import { IdGeneratorStub } from '@mocks/domain/ports/id/id-generator-stub'
import { CheckEmailExistsRepositorySpy } from '@mocks/domain/ports/repositories/check-email-exists-repository-spy'

interface SutTypes {
  createUserRepositorySpy: CreateUserRepositorySpy
  checkEmailExistsRepositorySpy: CheckEmailExistsRepositorySpy
  passwordHasherSpy: PasswordHasherSpy
  idGeneratorStub: IdGeneratorStub
  sut: CreateAccount
}

const makeSut = (): SutTypes => {
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  const checkEmailExistsRepositorySpy = new CheckEmailExistsRepositorySpy()
  const passwordHasherSpy = new PasswordHasherSpy()
  const idGeneratorStub = new IdGeneratorStub()
  const sut = new CreateAccount(
    createUserRepositorySpy,
    checkEmailExistsRepositorySpy,
    passwordHasherSpy,
    idGeneratorStub)
  return {
    createUserRepositorySpy,
    checkEmailExistsRepositorySpy,
    passwordHasherSpy,
    idGeneratorStub,
    sut
  }
}

describe('Create account', () => {
  const userProps = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }

  test('should return id of created user if email provided is not in use', async () => {
    const { sut, idGeneratorStub } = makeSut()
    const { res, err } = await sut.exec(userProps)
    expect(res?.id).toBe(idGeneratorStub.id)
    expect(err).toBeFalsy()
  })

  test('should return err if email provided is already in use', async () => {
    const { sut, checkEmailExistsRepositorySpy } = makeSut()
    jest.spyOn(checkEmailExistsRepositorySpy, 'check').mockResolvedValue(true)
    const { res, err } = await sut.exec(userProps)
    expect(res).toBeFalsy()
    expect(err).toBe('This email is already in use')
  })

  test('should call CreateUserRepository with correct values', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    await sut.exec(userProps)
    const { name, email, password } = createUserRepositorySpy.user
    expect(name).toBe(userProps.name)
    expect(email).toBe(userProps.email)
    expect(password).not.toBe(userProps.password)
  })

  test('should call CheckEmailExistsRepository with correct values', async () => {
    const { sut, checkEmailExistsRepositorySpy } = makeSut()
    await sut.exec(userProps)
    expect(checkEmailExistsRepositorySpy.email).toBe(userProps.email)
  })

  test('should call CreateUserRepository with id generated by IdGenerator', async () => {
    const { sut, createUserRepositorySpy, idGeneratorStub } = makeSut()
    await sut.exec(userProps)
    const { id } = createUserRepositorySpy.user
    const generatedId = idGeneratorStub.generate()
    expect(id).toBe(generatedId)
  })

  test('should call CreateUserRepository with hashed password', async () => {
    const { sut, createUserRepositorySpy, passwordHasherSpy } = makeSut()
    const hashedPassword = passwordHasherSpy.hash(userProps.password)
    await sut.exec(userProps)
    expect(createUserRepositorySpy.user.password).toBe(hashedPassword)
  })

  test('should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    jest.spyOn(createUserRepositorySpy, 'create').mockImplementation(() => {
      throw new Error()
    })
    await expect(sut.exec(userProps)).rejects.toThrow()
  })

  test('should throw if PasswordHasher throws', async () => {
    const { sut, passwordHasherSpy } = makeSut()
    jest.spyOn(passwordHasherSpy, 'hash').mockImplementation(() => {
      throw new Error()
    })
    await expect(sut.exec(userProps)).rejects.toThrow()
  })
})
