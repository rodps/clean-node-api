export const signupPath = {
  post: {
    tags: ['Auth'],
    summary: 'Register a new user',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/userSchema'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User created succesfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
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
        description: 'Email already in use',
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
