import { AddBookRepository } from '@/domain/ports/repositories/add-book-repository'
import { AddBookParams } from '@/domain/usecases/add-book'
import faker from 'faker'

export class AddBookRepositorySpy implements AddBookRepository {
  book: AddBookParams
  id: string = faker.datatype.uuid()
  async add (book: AddBookParams): Promise<string> {
    this.book = book
    return await Promise.resolve(this.id)
  }
}
