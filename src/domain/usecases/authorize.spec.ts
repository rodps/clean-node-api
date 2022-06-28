import { LoadUserByEmailRepositorySpy } from '@mocks/domain/ports/repositories/load-user-by-email-repository-spy'
import { Authorize } from './authorize'

describe('Authorize', () => {
  test('should return err if email dont exists', () => {
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    const authorize = new Authorize(loadUserByEmailRepositorySpy)
    loadUserByEmailRepositorySpy.result = null
    const { err } = authorize.exec('any_email', 'any_password')
    expect(err).toBe('Email not registered')
  })
})
