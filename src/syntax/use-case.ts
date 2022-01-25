import { Entity, SequenceDiagram } from '../models';
import { UseCase } from '../models/use-case';

export function useCase(title: string, description: string, useCaseRealization?: SequenceDiagram, entities?: Entity[]): UseCase {
  return new UseCase(title, description, useCaseRealization, entities);
}
