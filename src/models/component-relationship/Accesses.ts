import {
  Database, Processor, Service, UI, Cache,
} from '..';
import { ComponentRelationship } from './ComponentRelationship';

export class Accesses extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down->';

  source: Service | Database | Processor | UI | Cache;

  target: Service | Database | Cache;
}

/*
AccessConfiguration {
  entities: [
    {entity: Class, crudOperations: string}
  ];
}
*/
