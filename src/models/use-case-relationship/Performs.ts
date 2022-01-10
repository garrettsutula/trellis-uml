import { Actor } from '..';
import { UseCaseRelationship } from '.';

export class Performs extends UseCaseRelationship {
  source: Actor;
}
