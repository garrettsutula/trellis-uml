import { System, SystemConfiguration } from '../models';

export function system(config: SystemConfiguration): System;

export function system(config): System {
  return new System(config);
}
