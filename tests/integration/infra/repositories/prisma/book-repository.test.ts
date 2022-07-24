import { BookRepository } from '@/infra/repositories/prisma/book-repository'
import prisma from './client'

describe('Book repository', () => {
  afterAll(async () => {
    await prisma.user.deleteMany()
  })
  test('should create a new book', async () => {
    const book = {
      author: 'any_author',
      copies: 1,
      description: 'any_description',
      edition: 1,
      genre: 'any_genre',
      isbn: 'any_isbn',
      pages: 1,
      publish_date: 'any_date',
      publisher: 'any_publisher',
      title: 'any_title'
    }
    const sut = new BookRepository(prisma)
    const createdBook = await sut.add(book)

    const bookDb = await prisma.book.findUnique({
      where: {
        id: createdBook.id
      }
    })

    expect(bookDb).toBeTruthy()
    if (bookDb) {
      const { id, createdAt, updatedAt, ...bookWithoutIdAndDates } = bookDb
      expect(bookWithoutIdAndDates).toEqual(book)
    }
  })

  test('should check if isbn has already been added', async () => {
    const book = {
      author: 'any_author',
      copies: 1,
      description: 'any_description',
      edition: 1,
      genre: 'any_genre',
      isbn: 'any_isbn',
      pages: 1,
      publish_date: 'any_date',
      publisher: 'any_publisher',
      title: 'any_title'
    }
    const sut = new BookRepository(prisma)
    await sut.add(book)
    await expect(sut.checkIsbn(book.isbn)).resolves.toBe(true)
    await prisma.book.deleteMany()
    await expect(sut.checkIsbn(book.isbn)).resolves.toBe(false)
  })
})
