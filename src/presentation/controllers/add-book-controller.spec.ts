import { AddBookController } from './add-book-controller'
import { AddBook, AddBookParams } from '@/domain/usecases/add-book'
import { DeepMockProxy, mock } from 'jest-mock-extended'
import { ValidationError, Validator } from '../protocols/validator'
import { HttpResponse } from '../protocols/http-response'

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
  addBookSpy: DeepMockProxy<AddBook>
  validatorSpy: DeepMockProxy<Validator<AddBookParams>>
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

  test('should return bad request if validator returns error', async () => {
    const { sut, validatorSpy } = makeSut()
    const errors = [new ValidationError('any_field', 'any_message')]
    validatorSpy.validate.mockReturnValueOnce(errors)
    const httpResponse = await sut.handle(fakeBook)
    expect(httpResponse).toEqual(HttpResponse.badRequest(errors))
  })
})
