import { Book } from '../models/book'
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

export interface BookOrError {
  book?: Book
  err?: AddBookErrors
}

export enum AddBookErrors {
  ISBN_ALREADY_REGISTERED
}

export class AddBook {
  constructor (
    private readonly checkIsbnExistsRepository: CheckISBNExistsRepository,
    private readonly addBookRepository: AddBookRepository
  ) {}

  async exec (params: AddBookParams): Promise<BookOrError> {
    if (await this.checkIsbnExistsRepository.check(params.isbn)) {
      return { err: AddBookErrors.ISBN_ALREADY_REGISTERED }
    }
    const book = await this.addBookRepository.add(params)
    return { book }
  }
}
