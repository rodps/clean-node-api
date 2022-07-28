import { CreateAccount } from './create-account'
import { CreateUserRepositorySpy } from '@mocks/domain/ports/repositories/create-user-repository-spy'
import { PasswordHasherSpy } from '@/../tests/mocks/domain/ports/crypt/password-hasher-spy'
import { CheckEmailExistsRepositorySpy } from '@mocks/domain/ports/repositories/check-email-exists-repository-spy'
import faker from 'faker'
import '@relmify/jest-fp-ts'

interface SutTypes {
  createUserRepositorySpy: CreateUserRepositorySpy
  checkEmailExistsRepositorySpy: CheckEmailExistsRepositorySpy
  passwordHasherSpy: PasswordHasherSpy
  sut: CreateAccount
}

const makeSut = (): SutTypes => {
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  const checkEmailExistsRepositorySpy = new CheckEmailExistsRepositorySpy()
  const passwordHasherSpy = new PasswordHasherSpy()
  const sut = new CreateAccount(
    createUserRepositorySpy,
    checkEmailExistsRepositorySpy,
    passwordHasherSpy
  )
  return {
    createUserRepositorySpy,
    checkEmailExistsRepositorySpy,
    passwordHasherSpy,
    sut
  }
}

const fakeUser = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

describe('Create account', () => {
  test('should return id of created user', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    const result = await sut.exec(fakeUser)
    expect(result).toEqualRight(createUserRepositorySpy.id)
  })

  test('should return error if email provided is already in use', async () => {
    const { sut, checkEmailExistsRepositorySpy } = makeSut()
    checkEmailExistsRepositorySpy.result = true
    const result = await sut.exec(fakeUser)
    expect(result).toEqualLeft({ field: 'email', message: 'Email already in use' })
  })

  test('should call CreateUserRepository with correct values', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    await sut.exec(fakeUser)
    const { name, email, password } = createUserRepositorySpy.user
    expect(name).toBe(fakeUser.name)
    expect(email).toBe(fakeUser.email)
    expect(password).not.toBe(fakeUser.password)
  })

  test('should call CheckEmailExistsRepository with correct values', async () => {
    const { sut, checkEmailExistsRepositorySpy } = makeSut()
    await sut.exec(fakeUser)
    expect(checkEmailExistsRepositorySpy.email).toBe(fakeUser.email)
  })

  test('should call CreateUserRepository with hashed password', async () => {
    const { sut, createUserRepositorySpy, passwordHasherSpy } = makeSut()
    const hashedPassword = await passwordHasherSpy.hash(fakeUser.password)
    await sut.exec(fakeUser)
    expect(createUserRepositorySpy.user.password).toBe(hashedPassword)
  })

  test('should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    jest.spyOn(createUserRepositorySpy, 'create').mockImplementation(() => {
      throw new Error()
    })
    await expect(sut.exec(fakeUser)).rejects.toThrow()
  })

  test('should throw if PasswordHasher throws', async () => {
    const { sut, passwordHasherSpy } = makeSut()
    jest.spyOn(passwordHasherSpy, 'hash').mockImplementation(() => {
      throw new Error()
    })
    await expect(sut.exec(fakeUser)).rejects.toThrow()
  })
})
