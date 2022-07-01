import { IdGeneratorStub } from '@mocks/domain/ports/id/id-generator-stub'
import { AddBook, AddBookParams } from './add-book'
import faker from 'faker'
import { CheckISBNExistsRepositorySpy } from '@mocks/domain/ports/repositories/check-isbn-exists-repository-spy'

const fakeBook: AddBookParams = {
  title: 'Fake Book',
  isbn: '0-9667-9884-8',
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
  idGenerator: IdGeneratorStub
  checkISBNExistsRepositorySpy: CheckISBNExistsRepositorySpy
  sut: AddBook
}

const makeSut = (): SutTypes => {
  const idGenerator = new IdGeneratorStub()
  const checkISBNExistsRepositorySpy = new CheckISBNExistsRepositorySpy()
  const sut = new AddBook(idGenerator, checkISBNExistsRepositorySpy)
  return {
    idGenerator,
    checkISBNExistsRepositorySpy,
    sut
  }
}

describe('Add Book', () => {
  test('should return the id of the added book', () => {
    const { sut, idGenerator } = makeSut()
    idGenerator.id = faker.datatype.uuid()
    const { id, err } = sut.exec(fakeBook)
    expect(id).toBe(idGenerator.id)
    expect(err).toBeFalsy()
  })

  test('should return err if isbn provided is already registered', () => {
    const { sut, checkISBNExistsRepositorySpy } = makeSut()
    checkISBNExistsRepositorySpy.result = true
    const { id, err } = sut.exec(fakeBook)
    expect(id).toBeFalsy()
    expect(err).toBe('This isbn is already registered')
  })
})
