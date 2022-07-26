import { AddBookController } from './add-book-controller'
import { AddBook, AddBookErrors, AddBookParams } from '@/domain/usecases/add-book'
import { mock, MockProxy } from 'jest-mock-extended'
import { ValidationError, Validator } from '../protocols/validator'
import { HttpResponse } from '../protocols/http-response'
import { env } from '@/main/env'

const fakeBook: AddBookParams = {
  title: 'Fake Book',
  isbn: 'any_isbn',
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

const addBookResult = Object.assign(fakeBook, {
  id: 'any_id',
  createdAt: new Date(),
  updatedAt: null
})

interface SutTypes {
  addBookSpy: MockProxy<AddBook>
  validatorSpy: MockProxy<Validator<AddBookParams>>
  sut: AddBookController
}

const makeSut = (): SutTypes => {
  const addBookSpy = mock<AddBook>()
  addBookSpy.exec.mockResolvedValue({ book: addBookResult })
  const validatorSpy = mock<Validator<AddBookParams>>()
  validatorSpy.validate.mockReturnValue(null)
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

  test('should return conflict if AddBook returns ISBN_ALREADY_REGISTERED', async () => {
    const { sut, addBookSpy } = makeSut()
    addBookSpy.exec.mockResolvedValueOnce({ err: AddBookErrors.ISBN_ALREADY_REGISTERED })
    const httpResponse = await sut.handle(fakeBook)
    expect(httpResponse).toEqual(HttpResponse.conflict(new ValidationError('isbn', 'ISBN already registered')))
  })

  test('should return created if no error occurs', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(fakeBook)
    expect(httpResponse).toEqual(HttpResponse.created(`${env.baseUrl}/books/${addBookResult.id}`, addBookResult))
  })

  test('should return server error if AddBook throws error', async () => {
    const { sut, addBookSpy } = makeSut()
    addBookSpy.exec.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(fakeBook)
    expect(httpResponse).toEqual(HttpResponse.serverError())
  })
})
