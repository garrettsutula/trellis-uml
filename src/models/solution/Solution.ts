import { Component } from '../component';
import { ComponentRelationship } from '../component-relationship';
import { System } from '../system';
import { SystemRelationship } from '../system-relationship';

export class Solution implements SolutionConfiguration {
  name: string;

  description: string;

  componentRelationships: ComponentRelationship[];

  systems: { [key: string]: System };

  systemRelationships: SystemRelationship[];

  lifecycleChanges: {
    new: Component | ComponentRelationship;
    modified: Component | ComponentRelationship;
    deprecated: ComponentRelationship | ComponentRelationship;
  };

  constructor(public config: SolutionConfiguration) {
    this.name = config.name;
    this.description = config.description;
    this.componentRelationships = config.componentRelationships;
    this.systems = config.systems;
    this.systemRelationships = config.systemRelationships;
    this.lifecycleChanges = config.lifecycleChanges;
  }
}

export interface SolutionConfiguration {
  name: string;
  description: string;
  componentRelationships: ComponentRelationship[];
  systems: { [key: string]: System };
  systemRelationships: SystemRelationship[];
  lifecycleChanges?: {
    new: Component | ComponentRelationship;
    modified: Component | ComponentRelationship;
    deprecated: ComponentRelationship | ComponentRelationship;
  }
}
