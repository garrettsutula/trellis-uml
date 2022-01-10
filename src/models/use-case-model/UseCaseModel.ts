import { UseCase } from '../use-case';
import { UseCaseRelationship } from '../use-case-relationship';

export class UseCaseModel {
  useCases: { [key: string]: UseCase };

  useCaseRelationships: UseCaseRelationship[];
}
