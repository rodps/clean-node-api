import { Entity } from './entity-base'

export interface UserProps {
  name: string
  email: string
  password: string
}

export class User extends Entity {
  readonly name: string
  readonly email: string
  readonly password: string
  constructor (id: string, props: UserProps) {
    super(id)
    this.name = props.name
    this.email = props.email
    this.password = props.password
  }
}
