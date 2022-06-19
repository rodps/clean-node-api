import { v4 as uuid, validate } from 'uuid'
import { ValueObject } from './value-object'

interface EntityIDProps {
  id?: string
  err?: string
}

export class EntityID extends ValueObject<string, string> {
  readonly id?: string

  private constructor ({ id, err }: EntityIDProps) {
    super(id, err)
    this.id = id
  }

  static create (id?: string): EntityID {
    if (id) {
      const isValidUUID = validate(id)
      return isValidUUID ? new EntityID({ id }) : new EntityID({ err: 'Invalid UUID' })
    }
    return new EntityID({ id: uuid() })
  }
}
