import {
  System, Actor, Entity,
} from '..';
import { SystemRelationship, SystemRelationshipConfiguration } from './SystemRelationship';

export class SystemUses extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';

  source: System | Actor;

  entities?: Entity[];
}

export interface SystemUsesConfiguration extends SystemRelationshipConfiguration {
  entities?: Entity[];
}
