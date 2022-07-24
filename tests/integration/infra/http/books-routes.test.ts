import prisma from '@/infra/repositories/prisma/client'
import app from '@/main/config'
import { env } from '@/main/env'
import request from 'supertest'

describe('Books routes test', () => {
  afterEach(async () => {
    await prisma.book.deleteMany()
  })
  describe('POST /books', () => {
    test('should return 201', async () => {
      const response = await request(app)
        .post('/books')
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
        data: book
      })
      await request(app)
        .post('/books')
        .send(book)
        .expect(409)
    })

    test('should return 400', async () => {
      await request(app)
        .post('/books')
        .send({})
        .expect(400)
    })
  })
})
