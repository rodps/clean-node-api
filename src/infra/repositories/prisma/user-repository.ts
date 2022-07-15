import { PrismaClient } from '@prisma/client'
import { CreateUserRepository } from '@/domain/ports/repositories/create-user-repository'
import { CreateAccountParams } from '@/domain/ports/usecases/create-account-usecase'

export class UserRepository implements CreateUserRepository {
  private readonly prisma: PrismaClient
  constructor (db: PrismaClient) {
    this.prisma = db
  }

  async create (user: CreateAccountParams): Promise<string> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...user
      }
    })

    return createdUser.id
  }
}
