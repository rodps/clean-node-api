import { ValidationError } from '../protocols/validator'

export class InvalidEmailError extends ValidationError {
  constructor (field: string) {
    super(field, 'Invalid email')
  }
}
