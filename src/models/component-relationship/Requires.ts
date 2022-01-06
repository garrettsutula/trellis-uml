import { ComponentRelationship } from './ComponentRelationship';

export class Requires extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';
}
