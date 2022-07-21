import { ValidationError } from '../protocols/validator'

export class EmailNotRegisteredError extends ValidationError {
  constructor (field: string) {
    super(field, 'This email is not registered')
  }
}
