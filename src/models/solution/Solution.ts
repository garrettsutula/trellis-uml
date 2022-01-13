import { ComponentRelationship } from '../component-relationship';
import { System } from '../system';
import { SystemRelationship } from '../system-relationship';
import { UseCaseModel } from '..';

export class Solution {
  constructor(public config: {
    name: string,
    description: string,
    componentRelationships: ComponentRelationship[],
    systems: { [key: string]: System },
    systemRelationships: SystemRelationship[],
    useCaseModel?: UseCaseModel;
  }) {}
}

export interface SolutionConfiguration {
  name: string;
  description: string;
  componentRelationships: ComponentRelationship[];
  systems: { [key: string]: System };
  systemRelationships: SystemRelationship[];
  useCaseModel?: UseCaseModel;
}

/*
  lifecycleChanges?: {
    new: Component | ComponentRelationship;
    modified: Component | ComponentRelationship;
    deprecated: ComponentRelationship | ComponentRelationship;
  }
*/
