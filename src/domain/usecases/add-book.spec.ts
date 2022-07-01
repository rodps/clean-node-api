import { IdGeneratorStub } from '@/../tests/mocks/domain/ports/id/id-generator-stub'
import { AddBook, AddBookParams } from './add-book'
import faker from 'faker'

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

describe('Add Book', () => {
  test('should return the id of the added book', () => {
    const idGenerator = new IdGeneratorStub()
    const addBook = new AddBook(idGenerator)
    idGenerator.id = faker.datatype.uuid()
    const id = addBook.exec(fakeBook)
    expect(id).toBe(idGenerator.id)
  })
})
