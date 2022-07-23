import { ValidationError } from './validator'

type ResponseBody = ResponseData | ResponseError

interface ResponseData {
  success: true
  data?: any
  errors?: never
}

interface ResponseError {
  success: false
  data?: never
  errors?: ValidationError[]
}

export class HttpResponse {
  statusCode: number
  body?: ResponseBody
  header?: {
    location: string
  }

  private constructor (statusCode: number, body?: ResponseBody, header?: { location: string }) {
    this.statusCode = statusCode
    this.body = body
    this.header = header
  }

  static ok (data?: any): HttpResponse {
    const success = true
    return new HttpResponse(200, { success, data })
  }

  static created (location: string, data?: any): HttpResponse {
    const success = true
    return new HttpResponse(201, { success, data }, { location })
  }

  static badRequest (errors: ValidationError[]): HttpResponse {
    const success = false
    return new HttpResponse(400, { success, errors })
  }

  static serverError (): HttpResponse {
    return new HttpResponse(500)
  }

  static conflict (error: ValidationError): HttpResponse {
    const success = false
    return new HttpResponse(409, { success, errors: [error] })
  }

  static unauthorized (errors?: ValidationError[]): HttpResponse {
    const success = false
    return new HttpResponse(401, { success, errors })
  }
}
