import { UserProps } from '../entities/user'
import { CreateUserRepository } from '../ports/repositories/create-user-repository'
import { CreateAccount } from './create-account'

class CreateUserRepositorySpy implements CreateUserRepository {
  create (user: UserProps): boolean {
    return true
  }
}

describe('Create account', () => {
  test('Should return true if user repository returns true', () => {
    const userProps = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const createUserRepo = new CreateUserRepositorySpy()
    const createAccount = new CreateAccount(createUserRepo)
    const result = createAccount.exec(userProps)
    expect(result).toBe(true)
  })

  test('Should return false if user repository returns false', () => {
    const userProps = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const createUserRepo = new CreateUserRepositorySpy()
    jest.spyOn(createUserRepo, 'create').mockReturnValue(false)
    const createAccount = new CreateAccount(createUserRepo)
    const result = createAccount.exec(userProps)
    expect(result).toBe(false)
  })
})
