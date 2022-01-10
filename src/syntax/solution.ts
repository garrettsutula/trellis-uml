import { Solution, SolutionConfiguration } from '../models/solution';

export function solution(config: SolutionConfiguration): Solution;

export function solution(config): Solution {
  return new Solution(config);
}
