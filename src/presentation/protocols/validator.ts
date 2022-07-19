export class ValidationError {
  constructor (
    readonly field: string,
    readonly message: string
  ) {}
}

export interface Validator<T> {
  validate: (request: T) => ValidationError[] | null
}
