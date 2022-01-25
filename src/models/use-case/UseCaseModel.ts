import { Actor } from '..';
import { UseCase } from '.';
import { UseCaseRelationship } from '../use-case-relationship';

export class UseCaseModel {
  constructor(public actors: Actor[], public useCases: { [key: string]: UseCase }, public useCaseRelationships: UseCaseRelationship[]) {}
}

export interface UseCaseModelConfiguration {
  actors: Actor[];
  useCases: { [key: string]: UseCase };
  useCaseRelationships: UseCaseRelationship[];
}
