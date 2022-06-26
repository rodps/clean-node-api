import { Model } from './model'

export interface UserModel extends Model {
  name: string
  email: string
  password: string
}
