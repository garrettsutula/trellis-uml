/* eslint-disable max-classes-per-file */
import { BaseRelationship, BaseRelationshipConfiguration } from '../base/base-relationship';
import { Component } from '../component/Component';

export interface ComponentRelationshipConfiguration extends BaseRelationshipConfiguration {
  source: Component;
  target: Component;
}

export class ComponentRelationship extends BaseRelationship {
  source: Component;

  target: Component;
}
