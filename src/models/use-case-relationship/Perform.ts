import { Actor } from '..';
import { UseCaseRelationship } from '.';

export class Perform extends UseCaseRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = '->';

  source: Actor;
}
