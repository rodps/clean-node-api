export const addBookPath = {
  post: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Books'],
    summary: 'Add a book',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/bookSchema'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Book added succesfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                data: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string'
                    },
                    createdAt: {
                      type: 'string'
                    },
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
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Invalid parameters',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorSchema'
            }
          }
        }
      },
      409: {
        description: 'ISBN already in use',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorSchema'
            }
          }
        }
      },
      500: {
        description: 'Server error'
      }
    }
  }
}
