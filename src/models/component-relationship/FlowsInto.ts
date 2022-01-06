import { ComponentRelationship } from './ComponentRelationship';

export class FlowsInto extends ComponentRelationship {
  diagramFragmentBefore: string = '.';

  diagramFragmentAfter: string = 'down->';
}
