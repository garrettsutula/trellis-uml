import { System, Actor, Entity } from '..';
import { SystemRelationship } from './SystemRelationship';

export class Uses extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';

  source: System | Actor;

  entities: Entity[];
}

/*
InformationFlow {
  source: System;
  target: System;
  entities: [
    {entity: Class, crudOperations: string}
  ];
}
*/
