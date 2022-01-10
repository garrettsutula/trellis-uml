import { Entity } from '..';
import { SystemRelationship, SystemRelationshipConfiguration } from './SystemRelationship';

export class SystemFlowsInto extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';

  entities?: Entity[];

  constructor(config: FlowsIntoConfiguration) {
    super(config);

    this.entities = config.entities;
  }
}

export interface FlowsIntoConfiguration extends SystemRelationshipConfiguration {
  entities?: Entity[];
}
