import { ComponentRelationship } from './ComponentRelationship';

export class ConnectsTo extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = '-';
}
