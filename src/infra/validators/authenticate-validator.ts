import { AuthenticateParams } from '@/domain/ports/usecases/authenticate-usecase'
import { RequiredFieldError } from '@/presentation/errors/required-field-error'
import { ValidationError, Validator } from '@/presentation/protocols/validator'

export class AuthenticateValidator implements Validator<AuthenticateParams> {
  validate (request: AuthenticateParams): ValidationError[] | null {
    const errors: ValidationError[] = []
    if (!request.email) errors.push(new RequiredFieldError('email'))
    if (!request.password) errors.push(new RequiredFieldError('password'))
    return errors.length > 0 ? errors : null
  }
}
