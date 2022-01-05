import { System, SystemConfiguration } from '../models';

// Overload Signatures
export function system(config: SystemConfiguration): System;
export function system(config: SystemConfiguration[]): System[];

export function system(config): System | System[] {
  if (config instanceof Array) {
    return config.map((systemConfig) => new System(systemConfig));
  }
  return new System(config);
}
