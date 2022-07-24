import { CreateAccountParams } from '@/domain/ports/usecases/create-account-usecase'
import { UserRepository } from '@/infra/repositories/prisma/user-repository'
import prisma from './client'
import faker from 'faker'

describe('User repository integration', () => {
  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  describe('Create user', () => {
    test('should create a new user', async () => {
      const userRepository = new UserRepository(prisma)
      const fakeUser: CreateAccountParams = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password()
      }
      const userId = await userRepository.create(fakeUser)
      const newUser = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })
      expect(newUser).toBeTruthy()
      expect(newUser?.email).toBe(fakeUser.email)
      expect(newUser?.name).toBe(fakeUser.name)
      expect(newUser?.password).toBe(fakeUser.password)
      expect(newUser?.updatedAt).toBe(null)
      expect(newUser?.createdAt).toBeTruthy()
    })
  })

  describe('Check email exists', () => {
    test('should return true if email exists', async () => {
      const sut = new UserRepository(prisma)
      const fakeUser: CreateAccountParams = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password()
      }
      await prisma.user.create({
        data: {
          ...fakeUser
        }
      })
      expect(await sut.checkEmail(fakeUser.email)).toBe(true)
    })

    test('should return false if email dont exists', async () => {
      const sut = new UserRepository(prisma)
      expect(await sut.checkEmail('email')).toBe(false)
    })
  })

  describe('Load user by email', () => {
    test('should return an user if email was found', async () => {
      const sut = new UserRepository(prisma)
      const fakeUser: CreateAccountParams = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password()
      }
      await prisma.user.create({
        data: {
          ...fakeUser
        }
      })
      const user = await sut.loadByEmail(fakeUser.email)
      expect(user).toBeTruthy()
      if (user) {
        expect(user.email).toBe(fakeUser.email)
        expect(user.name).toBe(fakeUser.name)
        expect(user.password).toBe(fakeUser.password)
      }
    })

    test('should return null if email was not found', async () => {
      const sut = new UserRepository(prisma)
      const user = await sut.loadByEmail('email')
      expect(user).toBe(null)
    })
  })
})
