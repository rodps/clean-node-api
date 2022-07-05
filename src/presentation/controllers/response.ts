export class HttpResponse {
  statusCode: number
  body?: any
  header?: {
    location: string
  }

  private constructor (statusCode: number, body?: any, header?: { location: string }) {
    this.statusCode = statusCode
    this.body = body
    this.header = header
  }

  static ok (body?: any): HttpResponse {
    return new HttpResponse(200, body)
  }

  static created (location: string, body?: any): HttpResponse {
    return new HttpResponse(201, body, { location })
  }

  static badRequest (body: any): HttpResponse {
    return new HttpResponse(400, body)
  }

  static serverError (): HttpResponse {
    return new HttpResponse(500)
  }

  static conflict (body: any): HttpResponse {
    return new HttpResponse(409, body)
  }
}
