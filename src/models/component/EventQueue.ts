import { Queue } from './Queue';
import { API } from './API';

export class EventQueue extends Queue {
  stereotype = 'Event Queue';

  interfaces: {
    subscribe: API,
    publish: API,
  };

  constructor(label, config) {
    super(label, config);
    this.interfaces.subscribe = new API('subscribe', { parentComponent: this });
    this.interfaces.publish = new API('publish', { parentComponent: this });
  }
}
