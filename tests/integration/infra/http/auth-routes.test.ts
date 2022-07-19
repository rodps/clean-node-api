import app from '@/main/config'
import prisma from '@/infra/repositories/prisma/client'
import request from 'supertest'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') })

describe('Auth routes test', () => {
  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  test('POST /signup', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        name: 'Rodrigo',
        email: 'rodrigo@gmail.com',
        password: '123456789'
      })

    const user = await prisma.user.findUnique({
      where: {
        email: 'rodrigo@gmail.com'
      }
    })
    expect(user).toBeTruthy()
    if (user) {
      expect(response.status).toEqual(201)
      expect(response.header).toHaveProperty('location', `${process.env.BASE_URL ?? ''}/users/${user.id}`)
    }
  })
})
