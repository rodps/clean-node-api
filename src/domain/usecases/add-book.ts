import { IdGenerator } from '../ports/id/id-generator'

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

export class AddBook {
  constructor (private readonly idGenerator: IdGenerator) {}
  exec (params: AddBookParams): string {
    return this.idGenerator.generate()
  }
}
