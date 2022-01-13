import { Class } from './class';

export interface HttpRequest {
  verb: 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch';
  path: string;
  headers?: { [key: string]: string };
  query?: Class;
  body?: Class;
}
