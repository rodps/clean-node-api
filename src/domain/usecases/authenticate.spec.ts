import { AccessTokenGeneratorSpy } from '@/../tests/mocks/domain/ports/crypt/access-token-generator-spy'
import { PasswordHasherSpy } from '@/../tests/mocks/domain/ports/crypt/password-hasher-spy'
import { LoadUserByEmailRepositorySpy } from '@mocks/domain/ports/repositories/load-user-by-email-repository-spy'
import { Authenticate } from './authenticate'
import faker from 'faker'
import { UserModel } from '../models/user'
import '@relmify/jest-fp-ts'

interface SutTypes {
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy
  accessTokenGeneratorSpy: AccessTokenGeneratorSpy
  passwordHasherSpy: PasswordHasherSpy
  sut: Authenticate
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  const accessTokenGeneratorSpy = new AccessTokenGeneratorSpy()
  const passwordHasherSpy = new PasswordHasherSpy()
  const sut = new Authenticate(
    loadUserByEmailRepositorySpy,
    accessTokenGeneratorSpy,
    passwordHasherSpy
  )
  return {
    loadUserByEmailRepositorySpy,
    accessTokenGeneratorSpy,
    passwordHasherSpy,
    sut
  }
}

const fakeUser: UserModel = {
  id: faker.datatype.uuid(),
  createdAt: faker.date.past(),
  updatedAt: null,
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

describe('Authenticate', () => {
  test('should return err if email dont exists', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = null
    const result = await sut.exec({ email: 'any_email', password: 'any_password' })
    expect(result).toEqualLeft({ field: 'email', message: 'Email not registered' })
  })

  test('should call loadUserByEmailRepo with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    const email = faker.internet.email()
    await sut.exec({ email, password: 'any_password' })
    expect(loadUserByEmailRepositorySpy.email).toBe(email)
  })

  test('should return err if password is wrong', async () => {
    const { sut, passwordHasherSpy } = makeSut()
    passwordHasherSpy.compareResult = false
    const result = await sut.exec({ email: 'any_email', password: 'incorrect_password' })
    expect(result).toEqualLeft({ field: 'password', message: 'Incorrect password' })
  })

  test('should call passwordHasher.compare with correct values', async () => {
    const { sut, passwordHasherSpy, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = fakeUser
    const password = faker.internet.password()
    await sut.exec({ email: 'any_email', password })
    expect(passwordHasherSpy.plainText).toBe(password)
    expect(passwordHasherSpy.passwordHash).toBe(loadUserByEmailRepositorySpy.result.password)
  })

  test('should return an access token if email and password are correct', async () => {
    const {
      sut,
      loadUserByEmailRepositorySpy,
      accessTokenGeneratorSpy,
      passwordHasherSpy
    } = makeSut()
    loadUserByEmailRepositorySpy.result = fakeUser
    passwordHasherSpy.compareResult = true
    const result = await sut.exec({ email: 'correct_email', password: 'correct_password' })
    expect(result).toEqualRight({ accessToken: accessTokenGeneratorSpy.result })
  })

  test('should call accessTokenGenerator with correct values', async () => {
    const {
      sut,
      loadUserByEmailRepositorySpy,
      accessTokenGeneratorSpy,
      passwordHasherSpy
    } = makeSut()
    loadUserByEmailRepositorySpy.result = fakeUser
    passwordHasherSpy.compareResult = true
    const payload = {
      id: loadUserByEmailRepositorySpy.result.id,
      role: 'user'
    }
    await sut.exec({ email: 'correct_email', password: 'correct_password' })
    expect(accessTokenGeneratorSpy.payload).toEqual(payload)
  })
})
