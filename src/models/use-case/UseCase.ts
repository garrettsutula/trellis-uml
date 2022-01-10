import { Entity } from '..';

export class UseCase {
  title: string;

  description: string;

  entities?: Entity[];
}

export interface UseCaseConfiguration {
  title: string;
  description: string;
  entities?: Entity[];
}
