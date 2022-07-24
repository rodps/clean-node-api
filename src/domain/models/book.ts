import { Model } from './model'

export interface Book extends Model {
  title: string
  isbn: string
  pages: number
  author: string
  edition: number
  publisher: string
  description: string
  publish_date: string
  genre: string
  copies: number
}
