import { UseCase, UseCaseConfiguration } from '../models/use-case';

export function useCase(config: UseCaseConfiguration): UseCase;
export function useCase(config: UseCaseConfiguration[]): UseCase[];
export function useCase(config: UseCaseConfiguration | UseCaseConfiguration[]): UseCase | Array<UseCase> {
  if (config instanceof Array) {
    return config.map((useCaseConfig) => new UseCase(
      useCaseConfig.title,
      useCaseConfig.description,
      useCaseConfig.useCaseRealization,
      useCaseConfig.entities,
    ));
  }
  return new UseCase(
    config.title,
    config.description,
    config.useCaseRealization,
    config.entities,
  );
}
