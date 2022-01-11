import { Entity } from '..';

export class UseCase implements UseCaseConfiguration {
  constructor(public title: string, public description: string, public entities?: Entity[]) {}
}

export interface UseCaseConfiguration {
  title: string;
  description: string;
  entities?: Entity[];
}
