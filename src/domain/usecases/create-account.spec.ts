import { UserProps } from '../entities/user'
import { CreateUserRepository } from '../ports/repositories/create-user-repository'
import { CreateAccount } from './create-account'

class CreateUserRepositorySpy implements CreateUserRepository {
  user: UserProps
  create (user: UserProps): boolean {
    this.user = user
    return true
  }
}

interface SutTypes {
  createUserRepositorySpy: CreateUserRepositorySpy
  sut: CreateAccount
}

const makeSut = (): SutTypes => {
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  const sut = new CreateAccount(createUserRepositorySpy)
  return {
    createUserRepositorySpy,
    sut
  }
}

describe('Create account', () => {
  test('Should return true if user repository returns true', () => {
    const userProps = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const { sut } = makeSut()
    const result = sut.exec(userProps)
    expect(result).toBe(true)
  })

  test('Should return false if user repository returns false', () => {
    const userProps = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const { sut, createUserRepositorySpy } = makeSut()
    jest.spyOn(createUserRepositorySpy, 'create').mockReturnValue(false)
    const result = sut.exec(userProps)
    expect(result).toBe(false)
  })

  test('Should call create user repository with correct values', () => {
    const userProps = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const { sut, createUserRepositorySpy } = makeSut()
    sut.exec(userProps)
    expect(createUserRepositorySpy.user).toEqual(userProps)
  })
})
