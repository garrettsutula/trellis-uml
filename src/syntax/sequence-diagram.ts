import {
  SequenceDiagram, Sequence, Alt, Break, Critical, Group, Loop, Opt, Par,
} from '../models/sequence-diagram';

export function sequenceDiagram(sequence: Array<Sequence | SequenceDiagram>, title?: string) {
  return new SequenceDiagram(sequence, title);
}

export function alt(sequence: Array<Sequence | SequenceDiagram>, title?: string) {
  return new Alt(sequence, title);
}

export function breakSequence(sequence: Array<Sequence | SequenceDiagram>, title?: string) {
  return new Break(sequence, title);
}

export function critical(sequence: Array<Sequence | SequenceDiagram>, title?: string) {
  return new Critical(sequence, title);
}

export function group(sequence: Array<Sequence | SequenceDiagram>, title?: string) {
  return new Group(sequence, title);
}

export function optional(sequence: Array<Sequence | SequenceDiagram>, title?: string) {
  return new Opt(sequence, title);
}

export function loop(sequence: Array<Sequence | SequenceDiagram>, title?: string) {
  return new Loop(sequence, title);
}

export function parallel(sequence: Array<Sequence | SequenceDiagram>, title?: string) {
  return new Par(sequence, title);
}
