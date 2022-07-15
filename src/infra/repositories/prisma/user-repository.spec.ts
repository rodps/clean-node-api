import { UserRepository } from './user-repository'
import faker from 'faker'
import { prismaMock } from '@mocks/infra/repositories/prisma/prisma-mock'
import { mockReset } from 'jest-mock-extended'
import { User } from '@prisma/client'

interface SutTypes {
  sut: UserRepository
}

const makeSut = (): SutTypes => {
  const sut = new UserRepository(prismaMock)
  return { sut }
}

describe('User repository', () => {
  beforeEach(() => {
    mockReset(prismaMock)
  })

  describe('Create user', () => {
    test('should return the created user id', async () => {
      const { sut } = makeSut()
      const fakeUser: User = {
        id: faker.datatype.uuid(),
        createdAt: new Date(),
        updatedAt: null,
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
      const { name, email, password } = fakeUser
      prismaMock.user.create.mockResolvedValue(fakeUser)
      const result = await sut.create({ name, email, password })
      expect(result).toBe(fakeUser.id)
    })
  })
})
