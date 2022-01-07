import {
  Component, ComponentRelationshipConfiguration, Uses, Accesses, FlowsInto, Provides, Requires,
} from '../models';

export function uses(source: Component, target: Component, description?: string): Uses;
export function uses(config: ComponentRelationshipConfiguration): Uses;
export function uses(config: ComponentRelationshipConfiguration[]): Uses[];
export function uses(
  sourceOrConfig: Component | ComponentRelationshipConfiguration | ComponentRelationshipConfiguration[],
  target?: Component,
  description?: string,
): Uses | Uses[] {
  if (sourceOrConfig instanceof Array) {
    const relationships = sourceOrConfig;
    return relationships.map((relationship) => new Uses(relationship));
  }
  if (sourceOrConfig && target) {
    return new Uses(sourceOrConfig as Component, target, description);
  }
  return new Uses(sourceOrConfig as ComponentRelationshipConfiguration);
}

export function accesses(source: Component, target: Component, description?: string): Accesses;
export function accesses(config: ComponentRelationshipConfiguration): Accesses;
export function accesses(config: ComponentRelationshipConfiguration[]): Accesses[];
export function accesses(
  sourceOrConfig: Component | ComponentRelationshipConfiguration | ComponentRelationshipConfiguration[],
  target?: Component,
  description?: string,
): Accesses | Accesses[] {
  if (sourceOrConfig instanceof Array) {
    const relationships = sourceOrConfig;
    return relationships.map((relationship) => new Accesses(relationship));
  }
  if (sourceOrConfig && target) {
    return new Accesses(sourceOrConfig as Component, target, description);
  }
  return new Accesses(sourceOrConfig as ComponentRelationshipConfiguration);
}

export function flowsInto(source: Component, target: Component, description?: string): FlowsInto;
export function flowsInto(config: ComponentRelationshipConfiguration): FlowsInto;
export function flowsInto(config: ComponentRelationshipConfiguration[]): FlowsInto[];
export function flowsInto(
  sourceOrConfig: Component | ComponentRelationshipConfiguration | ComponentRelationshipConfiguration[],
  target?: Component,
  description?: string,
): FlowsInto | FlowsInto[] {
  if (sourceOrConfig instanceof Array) {
    const relationships = sourceOrConfig;
    return relationships.map((relationship) => new FlowsInto(relationship));
  }
  if (sourceOrConfig && target) {
    return new FlowsInto(sourceOrConfig as Component, target, description);
  }
  return new FlowsInto(sourceOrConfig as ComponentRelationshipConfiguration);
}

export function provides(source: Component, target: Component, description?: string): Provides;
export function provides(config: ComponentRelationshipConfiguration): Provides;
export function provides(config: ComponentRelationshipConfiguration[]): Provides[];
export function provides(
  sourceOrConfig: Component | ComponentRelationshipConfiguration | ComponentRelationshipConfiguration[],
  target?: Component,
  description?: string,
): Provides | Provides[] {
  if (sourceOrConfig instanceof Array) {
    const relationships = sourceOrConfig;
    return relationships.map((relationship) => new Provides(relationship));
  }
  if (sourceOrConfig && target) {
    return new Provides(sourceOrConfig as Component, target, description);
  }
  return new Provides(sourceOrConfig as ComponentRelationshipConfiguration);
}

export function requires(source: Component, target: Component, description?: string): Requires;
export function requires(config: ComponentRelationshipConfiguration): Requires;
export function requires(config: ComponentRelationshipConfiguration[]): Requires[];
export function requires(
  sourceOrConfig: Component | ComponentRelationshipConfiguration | ComponentRelationshipConfiguration[],
  target?: Component,
  description?: string,
): Requires | Requires[] {
  if (sourceOrConfig instanceof Array) {
    const relationships = sourceOrConfig;
    return relationships.map((relationship) => new Requires(relationship));
  }
  if (sourceOrConfig && target) {
    return new Requires(sourceOrConfig as Component, target, description);
  }
  return new Requires(sourceOrConfig as ComponentRelationshipConfiguration);
}
