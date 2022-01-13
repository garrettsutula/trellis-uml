import { BaseComponent, BaseRelationship } from '.';

export class Annotation implements AnnotationConfiguration {
  target: BaseComponent | BaseRelationship;

  direction: 'up' | 'down' | 'left' | 'right';

  description: string;
}

export interface AnnotationConfiguration {
  target: BaseComponent | BaseRelationship;
  direction: 'up' | 'down' | 'left' | 'right';
  description: string;
}
