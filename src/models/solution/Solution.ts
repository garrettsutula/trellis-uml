import { Component } from '../component';
import { ComponentRelationship } from '../component-relationship';
import { System } from '../system';
import { SystemRelationship } from '../system-relationship';

export class Solution {
  constructor(public config: {
    name: string,
    description: string,
    componentRelationships: ComponentRelationship[],
    systems: { [key: string]: System },
    systemRelationships: SystemRelationship[],
    lifecycleChanges: {
      new: Component | ComponentRelationship,
      modified: Component | ComponentRelationship,
      deprecated: ComponentRelationship | ComponentRelationship,
    },
  }) {}
}

export interface SolutionConfiguration {
  name: string;
  componentRelationships: ComponentRelationship[];
  systems: { [key: string]: System };
  systemRelationships: SystemRelationship[];
  lifecycleChanges?: {
    new: Component | ComponentRelationship;
    modified: Component | ComponentRelationship;
    deprecated: ComponentRelationship | ComponentRelationship;
  }
}
