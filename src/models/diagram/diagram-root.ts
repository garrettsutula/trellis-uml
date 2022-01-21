import {
  System, Domain, Solution, Roadmap, SequenceDiagram,
} from '..';
import { Class } from '../base/class';

export interface DiagramRoot {
  domainComponents: { [key: string]: Domain };
  informationModels: { [key: string]: Class };
  roadmaps: { [key: string]: Roadmap };
  sequenceDiagrams: { [key: string]: SequenceDiagram };
  solutions: { [key: string]: Solution };
  systems: { [key: string]: System };
}
