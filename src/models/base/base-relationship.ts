export class BaseRelationship {
  source: any;

  target: any;

  description?: string;

  color?: string;

  diagramFragmentBefore: string;

  diagramFragmentAfter: string;

  constructor(source: any, target: any, description?: string)
  constructor({
    source, target, description, color,
  }: BaseRelationshipConfiguration)
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
      [this.source, this.target, this.description] = args;
    }
  }
}

export interface BaseRelationshipConfiguration {
  source: any;
  target: any;
  description?: string;
  color?: string;
}
