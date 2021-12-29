import { System, Domain } from ".";

export interface DiagramRoot {
    domains: { [key: string]: Domain };
    systems: { [key: string]: System };
}