import { Class } from './class';

export interface HttpResponse {
  headers?: { [key: string]: string };
  body?: Class;
}
