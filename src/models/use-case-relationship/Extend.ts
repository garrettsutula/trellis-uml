import { UseCase } from '../use-case';
import { UseCaseRelationship } from '.';

export class Extend extends UseCaseRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = '.>';

  source: UseCase;
}
