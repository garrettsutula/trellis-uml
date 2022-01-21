import { Entity } from '..';
import { SystemRelationship, SystemRelationshipConfiguration } from './SystemRelationship';

export class SystemFlowsInto extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = '.>';

  stereotype: string = '<<Data Flow>>';

  thickness = 3;

  entities?: Entity[];

  constructor(config: FlowsIntoConfiguration) {
    super(config);

    this.entities = config.entities;
  }
}

export interface FlowsIntoConfiguration extends SystemRelationshipConfiguration {
  entities?: Entity[];
}
