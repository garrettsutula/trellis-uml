import { UseCase } from '../use-case';
import { UseCaseRelationship } from '.';

export class Include extends UseCaseRelationship {
  source: UseCase;
}
