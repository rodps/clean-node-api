import { CreateAccountParams } from '@/domain/ports/usecases/create-account-usecase'
import { UserRepository } from '@/infra/repositories/prisma/user-repository'
import { PrismaClient } from '@prisma/client'
import faker from 'faker'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') })

const prisma = new PrismaClient()

describe('User repository integration', () => {
  afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  })

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
