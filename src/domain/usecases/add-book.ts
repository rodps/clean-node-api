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
    private readonly checkIsbnExistsRepository: CheckISBNExistsRepository,
    private readonly addBookRepository: AddBookRepository
  ) {}

  async exec (params: AddBookParams): Promise<IdOrError> {
    if (await this.checkIsbnExistsRepository.check(params.isbn)) {
      return { err: 'This isbn is already registered' }
    }
    const id = await this.addBookRepository.add(params)
    return { id }
  }
}
