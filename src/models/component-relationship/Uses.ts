import { ComponentRelationship } from './ComponentRelationship';

export class Uses extends ComponentRelationship {
  diagramFragmentBefore: string = '.';

  diagramFragmentAfter: string = 'down->';
}
