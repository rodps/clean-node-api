import { AddBookParams } from '@/domain/usecases/add-book'
import { AddBookValidator } from './add-book-validator'

const bookWithoutValues: AddBookParams = {
  title: '',
  author: '',
  copies: 0,
  description: '',
  edition: 0,
  genre: '',
  isbn: '',
  pages: 0,
  publish_date: '',
  publisher: '',
  userId: ''
}

describe('Add book validator', () => {
  test('should return error if title is not provided', () => {
    const sut = new AddBookValidator()
    const errors = sut.validate(bookWithoutValues)
    expect(errors).toContainEqual({ field: 'title', message: 'This field is required' })
  })

  test('should return error if author is not provided', () => {
    const sut = new AddBookValidator()
    const errors = sut.validate(bookWithoutValues)
    expect(errors).toContainEqual({ field: 'author', message: 'This field is required' })
  })
})
