export const errorSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean'
    },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: {
            type: 'string'
          },
          message: {
            type: 'string'
          }
        }
      }
    }
  },
  example: {
    success: false,
    errors: [
      {
        field: 'field_name',
        message: 'error description'
      }
    ]
  }
}
