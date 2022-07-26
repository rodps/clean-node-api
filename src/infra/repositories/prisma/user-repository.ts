import { PrismaClient } from '@prisma/client'
import { CreateUserRepository } from '@/domain/ports/repositories/create-user-repository'
import { CreateAccountParams } from '@/domain/ports/usecases/create-account-usecase'
import { CheckEmailExistsRepository } from '@/domain/ports/repositories/check-email-exists-repository'
import { LoadUserByEmailRepository } from '@/domain/ports/repositories/load-user-by-email-repository'
import { UserModel } from '@/domain/models/user'

export class UserRepository implements CreateUserRepository, CheckEmailExistsRepository, LoadUserByEmailRepository {
  private readonly prisma: PrismaClient
  constructor (db: PrismaClient) {
    this.prisma = db
  }

  async create (user: CreateAccountParams): Promise<string> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        role: 'user'
      }
    })
    return createdUser.id
  }

  async checkEmail (email: string): Promise<Boolean> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    })
    return user !== null
  }

  async loadByEmail (email: string): Promise<UserModel | null> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    })
    return user
  }
}
