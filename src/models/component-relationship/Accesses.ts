import { ComponentRelationship } from './ComponentRelationship';

export class Accesses extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down->';
}
