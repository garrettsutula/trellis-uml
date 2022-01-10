import { UseCase } from '../use-case';
import { UseCaseRelationship } from '.';

export class Includes extends UseCaseRelationship {
  source: UseCase;
}
