import { Entity } from '..';
import { escapeString } from '../../common/utils';
import { SequenceDiagram } from '../sequence-diagram';

export class UseCase implements UseCaseConfiguration {
  protected _id: string;

  protected _title: string;

  public description: string;

  public useCaseRealization?: SequenceDiagram;

  public entities?: Entity[];

  constructor(title: string, description: string, useCaseRealization?: SequenceDiagram, entities?: Entity[]) {
    this.title = title;
    this.description = description;
    this.useCaseRealization = useCaseRealization;
    this.entities = entities;
  }

  public get id() {
    return this._id;
  }

  public set id(newId: string) {
    this._id = escapeString(newId);
  }

  public get title() {
    return this._title;
  }

  public set title(newTitle: string) {
    this._title = newTitle;
    this.id = newTitle;
  }
}

export interface UseCaseConfiguration {
  title: string;
  description: string;
  entities?: Entity[];
  useCaseRealization?: SequenceDiagram;
}
