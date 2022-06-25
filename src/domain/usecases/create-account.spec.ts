import { UserProps } from '@/domain/entities/user'
import { CreateUserRepository } from '@/domain/ports/repositories/create-user-repository'
import { PasswordHasher } from '@/domain/ports/crypt/password-hasher'
import { CreateAccount } from './create-account'

class CreateUserRepositorySpy implements CreateUserRepository {
  user: UserProps
  async create (user: UserProps): Promise<boolean> {
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
  const userProps = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }

  test('Should return true if CreateUserRepository returns true', async () => {
    const { sut } = makeSut()
    const result = await sut.exec(userProps)
    expect(result).toBe(true)
  })

  test('Should return false if CreateUserRepository returns false', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    jest.spyOn(createUserRepositorySpy, 'create').mockReturnValue(Promise.resolve(false))
    const result = await sut.exec(userProps)
    expect(result).toBe(false)
  })

  test('Should call CreateUserRepository with correct values', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    await sut.exec(userProps)
    const { name, email, password } = createUserRepositorySpy.user
    expect(name).toBe(userProps.name)
    expect(email).toBe(userProps.email)
    expect(password).not.toBe(userProps.password)
  })

  test('Should call CreateUserRepository with hashed password', async () => {
    const { sut, createUserRepositorySpy, passwordHasherStub } = makeSut()
    const hashedPassword = passwordHasherStub.hash(userProps.password)
    await sut.exec(userProps)
    expect(createUserRepositorySpy.user.password).toBe(hashedPassword)
  })

  test('Should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    jest.spyOn(createUserRepositorySpy, 'create').mockImplementation(() => {
      throw new Error()
    })
    await expect(sut.exec(userProps)).rejects.toThrow()
  })

  test('Should throw if PasswordHasher throws', async () => {
    const { sut, passwordHasherStub } = makeSut()
    jest.spyOn(passwordHasherStub, 'hash').mockImplementation(() => {
      throw new Error()
    })
    await expect(sut.exec(userProps)).rejects.toThrow()
  })
})
