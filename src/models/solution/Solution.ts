import {
  Component, ComponentRelationship, System, SystemRelationship,
} from '..';

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
}

export interface SolutionConfiguration {
  name: string;
  componentRelationships: ComponentRelationship[];
  systems: { [key: string]: System };
  systemRelationships: SystemRelationship[];
  lifecycleChanges: {
    new: Component | ComponentRelationship;
    modified: Component | ComponentRelationship;
    deprecated: ComponentRelationship | ComponentRelationship;
  }
}
