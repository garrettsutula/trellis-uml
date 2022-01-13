import { Entity } from '..';
import { SequenceDiagram } from '../sequence-diagram';

export class UseCase implements UseCaseConfiguration {
  constructor(public title: string, public description: string, public useCaseRealization?: SequenceDiagram, public entities?: Entity[]) {}
}

export interface UseCaseConfiguration {
  title: string;
  description: string;
  entities?: Entity[];
  useCaseRealization?: SequenceDiagram;
}
