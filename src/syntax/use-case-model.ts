import { UseCaseModel, UseCaseModelConfiguration } from '../models';

export function useCaseModel(config: UseCaseModelConfiguration): UseCaseModel {
  return new UseCaseModel(config.actors, config.useCases, config.useCaseRelationships);
}
