export class HttpResponse {
  statusCode: number
  body: any

  private constructor (statusCode: number, body: any) {
    this.statusCode = statusCode
    this.body = body
  }

  static ok (body: any): HttpResponse {
    return new HttpResponse(200, body)
  }

  static badRequest (body: any): HttpResponse {
    return new HttpResponse(400, body)
  }
}
