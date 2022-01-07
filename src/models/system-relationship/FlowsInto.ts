import { Entity } from '..';
import { SystemRelationship } from './SystemRelationship';

export class FlowsInto extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';

  entities: Entity[];
}
