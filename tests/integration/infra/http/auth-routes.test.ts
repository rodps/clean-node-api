import app from '@/main/config'
import prisma from '@/infra/repositories/prisma/client'
import request from 'supertest'
import { env } from '@/main/env'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

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

    test('should return 422', async () => {
      await prisma.user.create({
        data: {
          name: 'Rodrigo',
          email: 'rodrigo@gmail.com',
          password: '12345789',
          role: 'user'
        }
      })
      await request(app)
        .post('/signup')
        .send({
          name: 'Rodrigo',
          email: 'rodrigo@gmail.com',
          password: '123456789'
        })
        .expect(422)
    })

    test('should return 400', async () => {
      await request(app)
        .post('/signup')
        .send({})
        .expect(400)

      await request(app)
        .post('/signup')
        .send({
          name: 'Rodrigo',
          email: 'invalid_email',
          password: '123456789'
        })
        .expect(400)

      await request(app)
        .post('/signup')
        .send({
          name: 'Rodrigo',
          email: 'rodrigo@gmail.com',
          password: '123'
        })
        .expect(400)
    })
  })

  describe('POST /signin', () => {
    test('should return 200', async () => {
      const hasher = new BcryptAdapter(12)
      const password = await hasher.hash('123456789')
      await prisma.user.create({
        data: {
          name: 'Rodrigo',
          email: 'rodrigo@gmail.com',
          password,
          role: 'user'
        }
      })
      await request(app)
        .post('/signin')
        .send({
          email: 'rodrigo@gmail.com',
          password: '123456789'
        })
        .expect(200)
    })

    test('should return 401', async () => {
      await request(app)
        .post('/signin')
        .send({
          email: 'rodrigo@gmail.com',
          password: '123456789'
        })
        .expect(401)
    })

    test('should return 400', async () => {
      await request(app)
        .post('/signin')
        .send({})
        .expect(400)
    })
  })
})
