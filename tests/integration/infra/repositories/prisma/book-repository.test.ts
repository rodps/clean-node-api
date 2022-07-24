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
    const createdBook = await prisma.book.create({
      data: book
    })

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
})
