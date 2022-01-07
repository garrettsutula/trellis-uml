type Class = { new(...args: any[]): any; };

export class Entity {
  entity: Class;

  crudOperations?: string;
}
