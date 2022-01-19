import { Component, ComponentRelationship, SystemRelationship } from '..';
import { Solution } from '../solution';

export class Roadmap {
  constructor(
    public name: string,
    public description: string,
    public solutions: Solution[],
    public phases: Phase[] | PhaseOptions[],
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

export type PhaseOptions = Array<Phase>;

export interface RoadmapConfiguration {
  name: string;
  description: string;
  solutions: Solution[];
  phases: Phase[] | PhaseOptions[];
}
