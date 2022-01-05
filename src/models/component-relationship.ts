import { Component } from './component';

export interface ComponentRelationshipConfiguration {
  source: Component;
  target: Component;
  description?: string;
  color?: string;
}

export class ComponentRelationship {
  source: Component;

  target: Component;

  description?: string;

  color?: string;

  diagramFragmentBefore: string;

  diagramFragmentAfter: string;

  constructor(source: Component, target: Component, description?: string)
  constructor({
    source, target, description, color,
  }: ComponentRelationshipConfiguration)
  constructor(...args: Array<any>) {
    if (args.length === 1) {
      const {
        source, target, description, color,
      } = args[0];
      this.source = source;
      this.target = target;
      this.description = description;
      this.color = color;
    } else {
      this.source = args[0];
      this.target = args[1];
      this.description = args[2];
    }
  }
}

export class Uses extends ComponentRelationship {
  diagramFragmentBefore: string = '.';

  diagramFragmentAfter: string = 'down->';
}

export class Accesses extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down->';
}

export class FlowsInto extends ComponentRelationship {
  diagramFragmentBefore: string = '.';

  diagramFragmentAfter: string = 'down->';
}

export class Provides extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'up-';
}

export class Requires extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';
}

export class ConnectsTo extends ComponentRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = '-';
}
