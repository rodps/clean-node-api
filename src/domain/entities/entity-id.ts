import { v4 as uuid, validate } from 'uuid'

interface EntityIDProps {
  id?: string
  err?: string
}

export class EntityID {
  readonly id?: string
  readonly err?: string

  private constructor ({ id, err }: EntityIDProps) {
    this.id = id
    this.err = err
  }

  static create (id?: string): EntityID {
    if (id) {
      const isValidUUID = validate(id)
      return isValidUUID ? new EntityID({ id }) : new EntityID({ err: 'Invalid UUID' })
    }
    return new EntityID({ id: uuid() })
  }
}
