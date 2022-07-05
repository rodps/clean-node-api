export interface RequiredFieldsValidator<T> {
  validate: (input: T) => string[]
}
