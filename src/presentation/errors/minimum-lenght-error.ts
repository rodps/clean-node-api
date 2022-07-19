import { ValidationError } from '../protocols/validator'

export class MinimumLengthError extends ValidationError {
  constructor (field: string, min: number) {
    super(field, `The ${field} must have at least ${min} characters`)
  }
}
