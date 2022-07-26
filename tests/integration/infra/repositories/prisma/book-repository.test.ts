import { BookRepository } from '@/infra/repositories/prisma/book-repository'
import prisma from './client'

describe('Book repository', () => {
  let userId: string

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        email: 'email@mail.com',
        name: 'Rodrigo',
        password: '123',
        role: 'user'
      }
    })
    userId = user.id
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  afterEach(async () => {
    await prisma.book.deleteMany()
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
      title: 'any_title',
      userId
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
      expect(bookDb.addedBy).toEqual(book.userId)
      expect(bookDb.author).toEqual(book.author)
      expect(bookDb.copies).toEqual(book.copies)
      expect(bookDb.description).toEqual(book.description)
      expect(bookDb.edition).toEqual(book.edition)
      expect(bookDb.genre).toEqual(book.genre)
      expect(bookDb.isbn).toEqual(book.isbn)
      expect(bookDb.pages).toEqual(book.pages)
      expect(bookDb.publish_date).toEqual(book.publish_date)
      expect(bookDb.publisher).toEqual(book.publisher)
      expect(bookDb.title).toEqual(book.title)
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
      title: 'any_title',
      userId
    }
    await prisma.book.create({
      data: {
        title: 'any_title',
        isbn: 'any_isbn',
        pages: 999,
        author: 'any_author',
        publish_date: 'any_date',
        genre: 'any_genre',
        edition: 1,
        publisher: 'any_publisher',
        description: 'any_description',
        copies: 1,
        addedBy: userId
      }
    })
    const sut = new BookRepository(prisma)
    await expect(sut.checkIsbn(book.isbn)).resolves.toBe(true)
    await prisma.book.deleteMany()
    await expect(sut.checkIsbn(book.isbn)).resolves.toBe(false)
  })
})
