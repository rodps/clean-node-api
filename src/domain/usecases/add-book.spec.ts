import { AddBook, AddBookParams } from './add-book'
import faker from 'faker'
import { CheckISBNExistsRepositorySpy } from '@mocks/domain/ports/repositories/check-isbn-exists-repository-spy'
import { AddBookRepositorySpy } from '@/../tests/mocks/domain/ports/repositories/add-book-repository-spy'
import '@relmify/jest-fp-ts'

const fakeBook: AddBookParams = {
  title: 'Fake Book',
  isbn: faker.datatype.string(17),
  pages: 999,
  author: 'any_author',
  publish_date: 'any_date',
  genre: 'any_genre',
  edition: 1,
  publisher: 'any_publisher',
  description: 'any_description',
  copies: 1,
  userId: 'any_id'
}

interface SutTypes {
  checkISBNExistsRepositorySpy: CheckISBNExistsRepositorySpy
  addBookRepositorySpy: AddBookRepositorySpy
  sut: AddBook
}

const makeSut = (): SutTypes => {
  const checkISBNExistsRepositorySpy = new CheckISBNExistsRepositorySpy()
  const addBookRepositorySpy = new AddBookRepositorySpy()
  const sut = new AddBook(checkISBNExistsRepositorySpy, addBookRepositorySpy)
  return {
    checkISBNExistsRepositorySpy,
    addBookRepositorySpy,
    sut
  }
}

describe('Add Book', () => {
  test('should return the added book', async () => {
    const { sut, addBookRepositorySpy } = makeSut()
    const result = await sut.exec(fakeBook)
    expect(result).toEqualRight(addBookRepositorySpy.result)
  })

  test('should return err if isbn provided is already registered', async () => {
    const { sut, checkISBNExistsRepositorySpy } = makeSut()
    checkISBNExistsRepositorySpy.result = true
    const result = await sut.exec(fakeBook)
    expect(result).toEqualLeft({ field: 'isbn', message: 'This ISBN is already added' })
  })

  test('should call CheckISBExistsRepository with correct value', async () => {
    const { sut, checkISBNExistsRepositorySpy } = makeSut()
    await sut.exec(fakeBook)
    expect(checkISBNExistsRepositorySpy.isbn).toBe(fakeBook.isbn)
  })

  test('should call addBookRepository with correct values', async () => {
    const { sut, addBookRepositorySpy } = makeSut()
    await sut.exec(fakeBook)
    expect(addBookRepositorySpy.book).toEqual(fakeBook)
  })
})
