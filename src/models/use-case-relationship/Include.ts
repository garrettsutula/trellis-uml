import { UseCase } from '../use-case';
import { UseCaseRelationship } from '.';

export class Include extends UseCaseRelationship {
  diagramFragmentBefore: string = '<.';

  diagramFragmentAfter: string = '-';

  source: UseCase;
}
