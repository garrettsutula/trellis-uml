import { API, Service } from '..';
import { ComponentRelationship } from './ComponentRelationship';

export class Provides extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'up-';

  source: Service;

  target: API;
}
