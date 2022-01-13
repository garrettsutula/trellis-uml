/* eslint-disable max-classes-per-file */
import { HttpRequest } from '../base/http-request';
import { HttpResponse } from '../base/http-response';
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
  httpRequest?: HttpRequest
  httpResponse?: HttpResponse;
}
