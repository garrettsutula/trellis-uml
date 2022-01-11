import { Extend, Include, Perform } from '../models/use-case-relationship';
import { UseCase } from '../models/use-case';
import { Actor } from '../models';

export function extend(
  source: UseCase | Actor,
  target: UseCase,
): Extend {
  return new Extend(source, target);
}

export function include(
  source: UseCase | Actor,
  target: UseCase,
): Include {
  return new Include(source, target);
}

export function perform(
  source: UseCase | Actor,
  target: UseCase,
): Perform {
  return new Perform(source, target);
}
