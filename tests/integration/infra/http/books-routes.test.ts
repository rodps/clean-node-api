import { JWTAdapter } from '@/infra/cryptography/jsonwebtoken-adapter'
import prisma from '@/infra/repositories/prisma/client'
import app from '@/main/config'
import { env } from '@/main/env'
import request from 'supertest'

describe('Books routes test', () => {
  let accessToken: string
  let userId: string
  const jwtAdapter = new JWTAdapter(env.jwtSecret)

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        email: 'email@mail.com',
        name: 'Rodrigo',
        password: '123456',
        role: 'user'
      }
    })
    userId = user.id
    accessToken = jwtAdapter.generate({ id: user.id, role: 'user' })
  })

  afterEach(async () => {
    await prisma.book.deleteMany()
  })
  describe('POST /books', () => {
    test('should return 201', async () => {
      const response = await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'any_title',
          isbn: 'any_isbn',
          pages: 999,
          author: 'any_author',
          publish_date: 'any_date',
          genre: 'any_genre',
          edition: 1,
          publisher: 'any_publisher',
          description: 'any_description',
          copies: 1
        })
        .expect(201)
      expect(response.headers.location).toBe(`${env.baseUrl}/books/${response.body.data.id as string}`)
    })

    test('should return 409', async () => {
      const book = {
        title: 'any_title',
        isbn: 'any_isbn',
        pages: 999,
        author: 'any_author',
        publish_date: 'any_date',
        genre: 'any_genre',
        edition: 1,
        publisher: 'any_publisher',
        description: 'any_description',
        copies: 1
      }
      await prisma.book.create({
        data: {
          ...book,
          addedBy: userId
        }
      })
      await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(book)
        .expect(409)
    })

    test('should return 400', async () => {
      await request(app)
        .post('/books')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(400)
    })

    test('should return 401', async () => {
      await request(app)
        .post('/books')
        .send({})
        .expect(401)
    })
  })
})
