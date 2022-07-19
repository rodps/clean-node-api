import { CreateAccountParams } from '@/domain/ports/usecases/create-account-usecase'
import { ValidationError, Validator } from '../../presentation/protocols/validator'
import Joi from 'joi'

export class CreateAccountValidator implements Validator<CreateAccountParams> {
  validate (request: CreateAccountParams): ValidationError[] | null {
    const schema = Joi.object<CreateAccountParams>({
      name: Joi.string().min(4).required().messages({
        'string.min': 'The name must have at least 4 characters',
        'string.empty': 'This field is required',
        'any.required': 'This field is required'
      }),
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email',
        'string.empty': 'This field is required',
        'any.required': 'This field is required'
      }),
      password: Joi.string().min(6).required().messages({
        'string.min': 'The password must have at least 6 characters',
        'string.empty': 'This field is required',
        'any.required': 'This field is required'
      })
    })
    const { error } = schema.validate(request, { abortEarly: false })
    if (error) {
      return error.details.map<ValidationError>(err => ({
        field: err.path.join('/'),
        message: err.message
      }))
    }
    return null
  }
}
