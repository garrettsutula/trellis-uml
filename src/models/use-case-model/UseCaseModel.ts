import { UseCase } from '../use-case';
import { UseCaseRelationship } from '../use-case-relationship';

export class UseCaseModel {
  constructor(public useCases: { [key: string]: UseCase }, public useCaseRelationships: UseCaseRelationship[]) {}
}
