import { UseCase } from '../use-case';
import { UseCaseRelationship } from '.';

export class Extend extends UseCaseRelationship {
  source: UseCase;
}
