import { IdGenerator } from '@/domain/ports/id/id-generator'

export class IdGeneratorStub implements IdGenerator {
  id: string
  generate (): string {
    this.id = 'any_id'
    return this.id
  }
}
