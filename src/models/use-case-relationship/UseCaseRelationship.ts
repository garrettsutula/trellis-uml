import { BaseRelationship, BaseRelationshipConfiguration } from '../base/base-relationship';
import { Actor } from '..';
import { UseCase } from '../use-case';

export interface UseCaseRelationshipConfiguration extends BaseRelationshipConfiguration {
  source: Actor | UseCase;
  target: UseCase;
}

export class UseCaseRelationship extends BaseRelationship {
  source: Actor | UseCase;

  target: UseCase;
}
