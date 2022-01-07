import { SystemRelationship } from './SystemRelationship';

export class FlowsInfo extends SystemRelationship {
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
