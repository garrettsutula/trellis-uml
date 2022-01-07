import { System, Actor } from '..';
import { SystemRelationship } from './SystemRelationship';

export class Uses extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';

  source: System | Actor;
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
