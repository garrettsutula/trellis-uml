/* eslint-disable max-classes-per-file */
import { Class } from '../base/class';
import { Component } from '../component';
import { Entity } from '../entity';

export class SequenceDiagram implements SequenceDiagramConfiguration {
  constructor(public title: string, public sequence: Array<Sequence | SequenceDiagram>) {}
}

export interface SequenceDiagramConfiguration {
  title: string;
  sequence: Array<Sequence | SequenceDiagram>;
}

export interface Sequence {
  source: Component | Entity;
  target: Component | Entity;
  action: 'calls' | 'responds';
  description: string;
  httpRequest?: {
    verb: string;
    path: string;
    headers: { [key: string]: string };
    query: Class;
    body: Class;
  };
  httpResponse?: {
    headers: { [key: string]: string };
    body: Class;
  };
}
