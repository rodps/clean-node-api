import { HttpResponse } from './http-response'
import { ValidationError } from './validator'

describe('HTTP Response', () => {
  test('200 OK ', () => {
    const data = 'any_data'
    expect(HttpResponse.ok(data)).toEqual({
      statusCode: 200,
      body: {
        success: true,
        data
      }
    })
  })

  test('201 CREATED ', () => {
    const data = 'any_data'
    const location = 'any_location'
    expect(HttpResponse.created(location, data)).toEqual({
      statusCode: 201,
      body: {
        success: true,
        data
      },
      header: {
        location
      }
    })
  })

  test('400 BAD REQUEST', () => {
    const errors: ValidationError[] = [
      new ValidationError('any_field', 'any_message')
    ]
    expect(HttpResponse.badRequest(errors)).toEqual({
      statusCode: 400,
      body: {
        success: false,
        errors
      }
    })
  })

  test('409 CONFLICT', () => {
    expect(HttpResponse.conflict(new ValidationError('any_field', 'any_message'))).toEqual({
      statusCode: 409,
      body: {
        success: false,
        errors: [new ValidationError('any_field', 'any_message')]
      }
    })
  })

  test('500 SERVER ERROR', () => {
    expect(HttpResponse.serverError()).toEqual({
      statusCode: 500
    })
  })
})
