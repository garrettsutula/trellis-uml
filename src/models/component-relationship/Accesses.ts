import {
  Database, Processor, Service, UI, Cache,
} from '../component';
import { Entity } from '../entity';
import { ComponentRelationship } from './ComponentRelationship';

export class Accesses extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down->';

  stereotype = '<<Accesses>>';

  source: Service | Database | Processor | UI | Cache;

  target: Service | Database | Cache;

  entities?: Entity[];
}
