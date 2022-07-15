import { AccessTokenGeneratorSpy } from '@/../tests/mocks/domain/ports/crypt/access-token-generator-spy'
import { PasswordHasherSpy } from '@/../tests/mocks/domain/ports/crypt/password-hasher-spy'
import { LoadUserByEmailRepositorySpy } from '@mocks/domain/ports/repositories/load-user-by-email-repository-spy'
import { Authorize } from './authorize'
import faker from 'faker'
import { UserModel } from '../models/user'

interface SutTypes {
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy
  accessTokenGeneratorSpy: AccessTokenGeneratorSpy
  passwordHasherSpy: PasswordHasherSpy
  sut: Authorize
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  const accessTokenGeneratorSpy = new AccessTokenGeneratorSpy()
  const passwordHasherSpy = new PasswordHasherSpy()
  const sut = new Authorize(
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

describe('Authorize', () => {
  test('should return err if email dont exists', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = null
    const { token, err } = await sut.exec('any_email', 'any_password')
    expect(token).toBeFalsy()
    expect(err).toBe('Email not registered')
  })

  test('should call loadUserByEmailRepo with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    const email = faker.internet.email()
    await sut.exec(email, 'any_password')
    expect(loadUserByEmailRepositorySpy.email).toBe(email)
  })

  test('should return err if password is wrong', async () => {
    const { sut, passwordHasherSpy } = makeSut()
    passwordHasherSpy.compareResult = false
    const { token, err } = await sut.exec('any_email', 'incorrect_password')
    expect(token).toBeFalsy()
    expect(err).toBe('Incorrect password')
  })

  test('should call passwordHasher.compare with correct values', async () => {
    const { sut, passwordHasherSpy, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = fakeUser
    const password = faker.internet.password()
    await sut.exec('any_email', password)
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
    const { token, err } = await sut.exec('correct_email', 'correct_password')
    expect(err).toBeFalsy()
    expect(token).toBe(accessTokenGeneratorSpy.result)
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
      userName: loadUserByEmailRepositorySpy.result.name
    }
    await sut.exec('correct_email', 'correct_password')
    expect(accessTokenGeneratorSpy.payload).toEqual(payload)
  })
})
