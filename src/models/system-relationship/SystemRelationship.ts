/* eslint-disable max-classes-per-file */
import { Actor, System, Entity } from '..';
import { BaseRelationship, BaseRelationshipConfiguration } from '../base/base-relationship';

export interface SystemRelationshipConfiguration extends BaseRelationshipConfiguration {
  source: System | Actor;
  target: System;
  entities?: Entity[];
}

export class SystemRelationship extends BaseRelationship {
  source: System | Actor;

  target: System;

  sterotype: string;

  entities?: Entity[];
}
