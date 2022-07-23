import { Book } from '@/domain/models/book'
import { AddBookRepository } from '@/domain/ports/repositories/add-book-repository'
import { AddBookParams } from '@/domain/usecases/add-book'
import faker from 'faker'

export class AddBookRepositorySpy implements AddBookRepository {
  book: AddBookParams
  result: Book = {
    title: 'Fake Book',
    isbn: faker.datatype.string(17),
    pages: 999,
    author: 'any_author',
    publish_date: new Date(),
    genre: 'any_genre',
    edition: 1,
    publisher: 'any_publisher',
    description: 'any_description',
    copies: 1,
    id: 'any_id',
    createdAt: new Date(),
    updatedAt: null
  }

  async add (book: AddBookParams): Promise<Book> {
    this.book = book
    return await Promise.resolve(this.result)
  }
}
