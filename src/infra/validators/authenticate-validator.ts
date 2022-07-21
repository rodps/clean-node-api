import { AuthenticateParams } from '@/domain/ports/usecases/authenticate-usecase'
import { RequiredFieldError } from '@/presentation/errors/required-field-error'
import { ValidationError, Validator } from '@/presentation/protocols/validator'

export class AuthenticateValidator implements Validator<AuthenticateParams> {
  validate (request: AuthenticateParams): ValidationError[] | null {
    if (!request.email) return [new RequiredFieldError('email')]
    return null
  }
}
