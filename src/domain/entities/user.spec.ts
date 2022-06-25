import { User } from './user'

describe('User', () => {
  test('Should create an user with correct values', () => {
    const id = 'any_id'
    const userProps = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const user = new User(id, userProps)
    expect(user.id).toBe(id)
    expect(user.name).toBe(userProps.name)
    expect(user.email).toBe(userProps.email)
    expect(user.password).toBe(userProps.password)
  })
})
