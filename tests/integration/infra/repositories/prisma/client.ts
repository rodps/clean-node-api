import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') })

const prisma = new PrismaClient()

export default prisma
