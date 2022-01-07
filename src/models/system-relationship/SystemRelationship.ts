/* eslint-disable max-classes-per-file */
import { Actor, System } from '..';
import { BaseRelationship, BaseRelationshipConfiguration } from '../base/base-relationship';

export interface SystemRelationshipConfiguration extends BaseRelationshipConfiguration {
  source: System | Actor;
  target: System;
}

export class SystemRelationship extends BaseRelationship {
  source: System | Actor;

  target: System;
}
