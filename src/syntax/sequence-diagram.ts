import { SequenceDiagram, Sequence } from '../models/sequence-diagram';

export function sequenceDiagram(title: string, sequence: Array<Sequence | SequenceDiagram>) {
  return new SequenceDiagram(title, sequence);
}
