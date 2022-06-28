import { LoadUserByEmailRepositorySpy } from '@mocks/domain/ports/repositories/load-user-by-email-repository-spy'
import { Authorize } from './authorize'

interface SutTypes {
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy
  sut: Authorize
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  const sut = new Authorize(loadUserByEmailRepositorySpy)
  return {
    loadUserByEmailRepositorySpy,
    sut
  }
}

describe('Authorize', () => {
  test('should return err if email dont exists', () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = null
    const { err } = sut.exec('any_email', 'any_password')
    expect(err).toBe('Email not registered')
  })

  test('should should return err if password dont match', () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = {
      id: 'any_id',
      createdAt: new Date(),
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const { err } = sut.exec('any_email', 'incorrect_password')
    expect(err).toBe('Incorrect password')
  })
})
