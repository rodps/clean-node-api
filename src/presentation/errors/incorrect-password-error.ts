import { ValidationError } from '../protocols/validator'

export class IncorrectPasswordError extends ValidationError {
  constructor (field: string) {
    super(field, 'Incorrect password')
  }
}
