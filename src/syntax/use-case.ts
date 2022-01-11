import { Entity } from '../models';
import { UseCase } from '../models/use-case';

export function useCase(title: string, description: string, entities: Entity[]): UseCase {
  return new UseCase(title, description, entities);
}
