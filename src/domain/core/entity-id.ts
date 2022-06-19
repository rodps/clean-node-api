import { v4 as uuid, validate } from 'uuid'

export interface EntityIDResult {
  id?: EntityID
  err?: string
}

export class EntityID {
  readonly id: string

  private constructor (id: string) {
    this.id = id
  }

  static create (id?: string): EntityIDResult {
    if (id) {
      return validate(id) ? { id: new EntityID(id) } : { err: 'Invalid UUID' }
    }
    return { id: new EntityID(uuid()) }
  }
}
