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
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

describe('Authorize', () => {
  test('should return err if email dont exists', () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = null
    const { token, err } = sut.exec('any_email', 'any_password')
    expect(token).toBeFalsy()
    expect(err).toBe('Email not registered')
  })

  test('should call loadUserByEmailRepo with correct values', () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    const email = faker.internet.email()
    sut.exec(email, 'any_password')
    expect(loadUserByEmailRepositorySpy.email).toBe(email)
  })

  test('should return err if password is wrong', () => {
    const { sut, passwordHasherSpy } = makeSut()
    passwordHasherSpy.compareResult = false
    const { token, err } = sut.exec('any_email', 'incorrect_password')
    expect(token).toBeFalsy()
    expect(err).toBe('Incorrect password')
  })

  test('should call passwordHasher.compare with correct values', () => {
    const { sut, passwordHasherSpy, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = fakeUser
    const password = faker.internet.password()
    sut.exec('any_email', password)
    expect(passwordHasherSpy.plainText).toBe(password)
    expect(passwordHasherSpy.passwordHash).toBe(loadUserByEmailRepositorySpy.result.password)
  })

  test('should return an access token if email and password are correct', () => {
    const {
      sut,
      loadUserByEmailRepositorySpy,
      accessTokenGeneratorSpy,
      passwordHasherSpy
    } = makeSut()
    loadUserByEmailRepositorySpy.result = fakeUser
    passwordHasherSpy.compareResult = true
    const { token, err } = sut.exec('correct_email', 'correct_password')
    expect(err).toBeFalsy()
    expect(token).toBe(accessTokenGeneratorSpy.result)
  })
})
