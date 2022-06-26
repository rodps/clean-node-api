import { IdGenerator } from '@/domain/ports/id/id-generator'

export class IdGeneratorStub implements IdGenerator {
  generate (): string {
    return 'any_id'
  }
}
