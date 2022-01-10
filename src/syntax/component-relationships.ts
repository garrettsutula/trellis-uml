import {
  Component, ComponentRelationshipConfiguration, Uses, Accesses, Provides, Requires,
} from '../models';

export function uses(source: Component, target: Component, description?: string): Uses;
export function uses(config: ComponentRelationshipConfiguration): Uses;
export function uses(
  sourceOrConfig: Component | ComponentRelationshipConfiguration,
  target?: Component,
  description?: string,
): Uses {
  if (sourceOrConfig && target) {
    return new Uses(sourceOrConfig as Component, target, description);
  }
  return new Uses(sourceOrConfig as ComponentRelationshipConfiguration);
}

export function accesses(source: Component, target: Component, description?: string): Accesses;
export function accesses(config: ComponentRelationshipConfiguration): Accesses;
export function accesses(
  sourceOrConfig: Component | ComponentRelationshipConfiguration,
  target?: Component,
  description?: string,
): Accesses {
  if (sourceOrConfig && target) {
    return new Accesses(sourceOrConfig as Component, target, description);
  }
  return new Accesses(sourceOrConfig as ComponentRelationshipConfiguration);
}

export function provides(source: Component, target: Component, description?: string): Provides;
export function provides(config: ComponentRelationshipConfiguration): Provides;
export function provides(
  sourceOrConfig: Component | ComponentRelationshipConfiguration,
  target?: Component,
  description?: string,
): Provides {
  if (sourceOrConfig && target) {
    return new Provides(sourceOrConfig as Component, target, description);
  }
  return new Provides(sourceOrConfig as ComponentRelationshipConfiguration);
}

export function requires(source: Component, target: Component, description?: string): Requires;
export function requires(config: ComponentRelationshipConfiguration): Requires;
export function requires(
  sourceOrConfig: Component | ComponentRelationshipConfiguration,
  target?: Component,
  description?: string,
): Requires {
  if (sourceOrConfig && target) {
    return new Requires(sourceOrConfig as Component, target, description);
  }
  return new Requires(sourceOrConfig as ComponentRelationshipConfiguration);
}
