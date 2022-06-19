export abstract class ValueObject<T, E> {
  readonly value?: T
  readonly err?: E

  constructor (value?: T, err?: E) {
    if (!value && !err) throw new Error('Value and error are not assigneds')
    this.value = value
    this.err = err
  }
}
