export abstract class ClientError {
  readonly errors: any
  constructor (errors: any) {
    this.errors = errors
  }
}
