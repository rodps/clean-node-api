import { ValidationError } from '../protocols/validator'

export class RequiredFieldError extends ValidationError {
  constructor (field: string) {
    super(field, 'This field is required')
  }
}
