import { UserProps } from '../entities/user'
import { CreateUserRepository } from '../ports/repositories/create-user-repository'
import { PasswordHasher } from '../ports/utils/password-hasher'
import { CreateAccount } from './create-account'

class CreateUserRepositorySpy implements CreateUserRepository {
  user: UserProps
  create (user: UserProps): boolean {
    this.user = user
    return true
  }
}

class PasswordHasherStub implements PasswordHasher {
  hash (password: string): string {
    return 'hashed_password'
  }

  compare (plainText: string, hash: string): boolean {
    return true
  }
}

interface SutTypes {
  createUserRepositorySpy: CreateUserRepositorySpy
  passwordHasherStub: PasswordHasherStub
  sut: CreateAccount
}

const makeSut = (): SutTypes => {
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  const passwordHasherStub = new PasswordHasherStub()
  const sut = new CreateAccount(createUserRepositorySpy, passwordHasherStub)
  return {
    createUserRepositorySpy,
    passwordHasherStub,
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
    const { name, email, password } = createUserRepositorySpy.user
    expect(name).toBe(userProps.name)
    expect(email).toBe(userProps.email)
    expect(password).not.toBe(userProps.password)
  })

  test('Should call create user repository with hashed password', () => {
    const userProps = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const { sut, createUserRepositorySpy, passwordHasherStub } = makeSut()
    const hashedPassword = passwordHasherStub.hash(userProps.password)
    sut.exec(userProps)
    expect(createUserRepositorySpy.user.password).toBe(hashedPassword)
  })
})
