export const signinPath = {
  post: {
    tags: ['Auth'],
    summary: 'Login',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginSchema'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Logged in successfully',
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
                    accessToken: {
                      type: 'string'
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
      500: {
        description: 'Server error'
      }
    }
  }
}
