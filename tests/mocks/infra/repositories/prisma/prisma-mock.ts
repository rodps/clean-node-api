import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

export const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>()
