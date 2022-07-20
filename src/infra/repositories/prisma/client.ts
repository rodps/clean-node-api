import { PrismaClient } from '@prisma/client'
import '@/main/env'

const prisma = new PrismaClient()

export default prisma
