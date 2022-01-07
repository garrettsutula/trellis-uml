import { SystemRelationship } from './SystemRelationship';

export class FlowsInto extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';
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
