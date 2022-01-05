import { System, Domain } from '.';

export interface DiagramRoot {
  domainComponents: { [key: string]: Domain };
  systems: { [key: string]: System };
}
