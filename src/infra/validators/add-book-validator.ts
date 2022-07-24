import { AddBookParams } from '@/domain/usecases/add-book'
import { ValidationError, Validator } from '@/presentation/protocols/validator'
import Joi from 'joi'

export class AddBookValidator implements Validator<AddBookParams> {
  validate (request: AddBookParams): ValidationError[] | null {
    const schema = Joi.object({
      title: Joi.string().required().messages(({
        'any.required': 'This field is required',
        'string.empty': 'This field is required'
      })),
      author: Joi.string().required().messages(({
        'any.required': 'This field is required',
        'string.empty': 'This field is required'
      }))
    })
    const { error } = schema.validate(request, { abortEarly: false, allowUnknown: true })
    if (error) {
      return error.details.map<ValidationError>(err => ({
        field: err.path.join('/'),
        message: err.message
      }))
    }
    return null
  }
}
