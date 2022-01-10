import { API, Service } from '../component';
import { ComponentRelationship } from './ComponentRelationship';

export class Provides extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'up-';

  source: Service;

  target: API;
}
