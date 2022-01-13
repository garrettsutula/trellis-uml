import { UseCase } from '../models/use-case';
import { Actor, UseCaseModel } from '../models';
import { UseCaseRelationship } from '../models/use-case-relationship';

export function useCaseModel(
  actors: Actor[],
  useCases: { [key: string]: UseCase },
  useCaseRelationships: UseCaseRelationship[],
): UseCaseModel {
  return new UseCaseModel(actors, useCases, useCaseRelationships);
}
