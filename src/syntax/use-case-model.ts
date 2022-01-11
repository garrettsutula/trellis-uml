import { UseCase } from '../models/use-case';
import { UseCaseModel } from '../models/use-case-model';
import { UseCaseRelationship } from '../models/use-case-relationship';

export function useCaseModel(useCases: { [key: string]: UseCase }, useCaseRelationships: UseCaseRelationship[]): UseCaseModel {
  return new UseCaseModel(useCases, useCaseRelationships);
}
