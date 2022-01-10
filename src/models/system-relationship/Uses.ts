import {
  System, Actor, Entity, SystemRelationshipConfiguration,
} from '..';
import { SystemRelationship } from './SystemRelationship';

export class SystemUses extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';

  source: System | Actor;

  entities?: Entity[];
}

export interface SystemUsesConfiguration extends SystemRelationshipConfiguration {
  entities?: Entity[];
}
