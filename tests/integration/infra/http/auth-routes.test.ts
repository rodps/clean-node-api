import app from '@/main/config'
import prisma from '@/infra/repositories/prisma/client'
import request from 'supertest'
import { env } from '@/main/env'

describe('Auth routes test', () => {
  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  describe('POST /signup', () => {
    test('should return 201', async () => {
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
        expect(response.header).toHaveProperty('location', `${env.baseUrl}/users/${user.id}`)
      }
    })

    test('should return 409', async () => {
      await prisma.user.create({
        data: {
          name: 'Rodrigo',
          email: 'rodrigo@gmail.com',
          password: '12345789'
        }
      })
      await request(app)
        .post('/signup')
        .send({
          name: 'Rodrigo',
          email: 'rodrigo@gmail.com',
          password: '123456789'
        })
        .expect(409)
    })
  })
})
