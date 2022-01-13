import { Component, ComponentRelationship, SystemRelationship } from '..';
import { Solution } from '../solution';

export class Roadmap {
  constructor(
    public name: string,
    public description: string,
    public solutions: Solution[],
    public phases: Phase[] | Array<Array<Phase>>,
  ) {}
}

export interface Phase {
  systemRelationships: SystemRelationship[];
  componentRelationships: ComponentRelationship[];
  annotations: string;
  lifecycleChanges?: {
    new: Array<Component | ComponentRelationship>;
    modified: Array<Component | ComponentRelationship>;
    deprecated: Array<Component | ComponentRelationship>;
  }
}

export interface RoadmapConfiguration {
  name: string;
  description: string;
  solutions: Solution[];
  phases: Phase[] | Array<Array<Phase>>;
}
