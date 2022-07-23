import { AddBookController } from './add-book-controller'
import { AddBook, AddBookParams } from '@/domain/usecases/add-book'
import { mock } from 'jest-mock-extended'
import { Validator } from '../protocols/validator'

const fakeBook: AddBookParams = {
  title: 'Fake Book',
  isbn: 'any_isbn',
  pages: 999,
  author: 'any_author',
  publish_date: new Date(),
  genre: 'any_genre',
  edition: 1,
  publisher: 'any_publisher',
  description: 'any_description',
  copies: 1
}

interface SutTypes {
  addBookSpy: AddBook
  validatorSpy: Validator<AddBookParams>
  sut: AddBookController
}

const makeSut = (): SutTypes => {
  const addBookSpy = mock<AddBook>()
  const validatorSpy = mock<Validator<AddBookParams>>()
  const sut = new AddBookController(addBookSpy, validatorSpy)
  return {
    addBookSpy,
    validatorSpy,
    sut
  }
}

describe('Add book controller', () => {
  test('should call validator with correct values', async () => {
    const { sut, validatorSpy } = makeSut()
    await sut.handle(fakeBook)
    expect(validatorSpy.validate).toBeCalledWith(fakeBook)
  })
})
