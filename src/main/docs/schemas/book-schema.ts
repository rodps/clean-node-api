export const bookSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    isbn: {
      type: 'string'
    },
    pages: {
      type: 'number'
    },
    author: {
      type: 'string'
    },
    publish_date: {
      type: 'string'
    },
    genre: {
      type: 'string'
    },
    edition: {
      type: 'number'
    },
    publisher: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    copies: {
      type: 'number'
    }
  },
  required: ['title', 'author', 'isbn']
}
