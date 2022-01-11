import { Actor } from '..';
import { UseCaseRelationship } from '.';

export class Perform extends UseCaseRelationship {
  source: Actor;
}
