import { v4 as uuid } from 'uuid'

export class EntityID {
  readonly id: string

  constructor (id?: string) {
    this.id = id ?? uuid()
  }
}
