import { Solution, SolutionConfiguration } from '../models/solution';

export function solution(config: SolutionConfiguration): Solution {
  return new Solution(
    config.name,
    config.description,
    config.componentRelationships,
    config.systems,
    config.systemRelationships,
    config.useCaseModel,
  );
}
