import { AccessTokenGeneratorSpy } from '@/../tests/mocks/domain/ports/crypt/access-token-generator-spy'
import { PasswordHasherSpy } from '@/../tests/mocks/domain/ports/crypt/password-hasher-spy'
import { LoadUserByEmailRepositorySpy } from '@mocks/domain/ports/repositories/load-user-by-email-repository-spy'
import { Authorize } from './authorize'

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

describe('Authorize', () => {
  test('should return err if email dont exists', () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = null
    const { token, err } = sut.exec('any_email', 'any_password')
    expect(token).toBeFalsy()
    expect(err).toBe('Email not registered')
  })

  test('should return err if password is wrong', () => {
    const { sut, loadUserByEmailRepositorySpy, passwordHasherSpy } = makeSut()
    loadUserByEmailRepositorySpy.result = {
      id: 'any_id',
      createdAt: new Date(),
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password'
    }
    passwordHasherSpy.compareResult = false
    const { token, err } = sut.exec('any_email', 'incorrect_password')
    expect(token).toBeFalsy()
    expect(err).toBe('Incorrect password')
  })

  test('should return an access token if email and password are correct', () => {
    const {
      sut,
      loadUserByEmailRepositorySpy,
      accessTokenGeneratorSpy,
      passwordHasherSpy
    } = makeSut()
    loadUserByEmailRepositorySpy.result = {
      id: 'any_id',
      createdAt: new Date(),
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password'
    }
    passwordHasherSpy.compareResult = true
    const { token, err } = sut.exec('correct_email', 'correct_password')
    expect(err).toBeFalsy()
    expect(token).toBe(accessTokenGeneratorSpy.result)
  })
})
