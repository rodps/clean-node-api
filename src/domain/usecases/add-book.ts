import { IdGenerator } from '../ports/id/id-generator'
import { AddBookRepository } from '../ports/repositories/add-book-repository'
import { CheckISBNExistsRepository } from '../ports/repositories/check-isbn-exists-repository'

export interface AddBookParams {
  title: string
  isbn: string
  pages: number
  author: string
  edition: number
  publisher: string
  description: string
  publish_date: Date
  genre: string
  copies: number
}

export interface IdOrError {
  id?: string
  err?: string
}

export class AddBook {
  constructor (
    private readonly idGenerator: IdGenerator,
    private readonly checkIsbnExistsRepository: CheckISBNExistsRepository,
    private readonly addBookRepository: AddBookRepository
  ) {}

  async exec (params: AddBookParams): Promise<IdOrError> {
    if (this.checkIsbnExistsRepository.check(params.isbn)) {
      return { err: 'This isbn is already registered' }
    }
    await this.addBookRepository.add(params)
    return { id: this.idGenerator.generate() }
  }
}
