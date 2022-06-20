import { v4 as uuid, validate } from 'uuid'

export interface EntityIdOrError {
  entityId?: EntityID
  err?: string
}

export class EntityID {
  readonly id?: string

  private constructor (id?: string) {
    this.id = id ?? uuid()
  }

  static create (id?: string): EntityIdOrError {
    if (id) {
      const isValidUUID = validate(id)
      return isValidUUID ? { entityId: new EntityID(id) } : { err: 'Invalid UUID' }
    }
    return { entityId: new EntityID() }
  }
}
