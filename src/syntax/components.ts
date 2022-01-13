import {
  API,
  Cache,
  Component,
  ComponentConfiguration,
  Database,
  Device,
  Domain,
  ExecutionEnvironment,
  Processor,
  Queue,
  Service,
  UI,
  Schema,
  Topic,
  EventQueue,
  Actor,
} from '../models';

export function ui(label: string, parentComponent?: Component): UI;
export function ui(config: ComponentConfiguration): UI;
export function ui(config: ComponentConfiguration[]): UI[];
export function ui(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): UI | UI[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((uiConfig) => new UI(uiConfig.label, uiConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new UI(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new UI(config.label, config);
}

export function database(label: string, parentComponent?: Component): Database;
export function database(config: ComponentConfiguration): Database;
export function database(config: ComponentConfiguration[]): Database[];
export function database(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): Database | Database[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new Database(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new Database(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new Database(config.label, config);
}

export function service(label: string, parentComponent?: Component): Service;
export function service(config: ComponentConfiguration): Service;
export function service(config: ComponentConfiguration[]): Service[];
export function service(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): Service | Service[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => {
      const newService = new Service(dbConfig.label, dbConfig);
      newService.interface = new API('internal');
      return newService;
    });
  }
  let newService: Service;
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    newService = new Service(label, { parentComponent });
  } else {
    const config = labelOrConfig as ComponentConfiguration;
    newService = new Service(config.label, config);
  }
  newService.interface = new API('internal');
  return newService;
}

export function api(label: string, parentComponent?: Component): API;
export function api(config: ComponentConfiguration): API;
export function api(config: ComponentConfiguration[]): API[];
export function api(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): API | API[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new API(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new API(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new API(config.label, config);
}

export function topic(label: string, parentComponent?: Component): Topic;
export function topic(config: ComponentConfiguration): Topic;
export function topic(config: ComponentConfiguration[]): Topic[];
export function topic(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): Topic | Topic[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new Topic(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new Topic(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new Topic(config.label, config);
}

export function eventQueue(label: string, parentComponent?: Component): EventQueue;
export function eventQueue(config: ComponentConfiguration): EventQueue;
export function eventQueue(config: ComponentConfiguration[]): EventQueue[];
export function eventQueue(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): EventQueue | EventQueue[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new EventQueue(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new EventQueue(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new EventQueue(config.label, config);
}

export function queue(label: string, parentComponent?: Component): Queue;
export function queue(config: ComponentConfiguration): Queue;
export function queue(config: ComponentConfiguration[]): Queue[];
export function queue(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): Queue | Queue[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => {
      const newQueue = new Queue(dbConfig.label, dbConfig);
      newQueue.interfaces = {
        publish: new API('publish'),
        subscribe: new API('subscribe'),
      };
      return newQueue;
    });
  }
  let newQueue;
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    newQueue = new Queue(label, { parentComponent });
  } else {
    const config = labelOrConfig as ComponentConfiguration;
    newQueue = new Queue(config.label, config);
  }
  newQueue.interfaces = {
    publish: new API('publish'),
    subscribe: new API('subscribe'),
  };
  return newQueue;
}

export function cache(label: string, parentComponent?: Component): Cache;
export function cache(config: ComponentConfiguration): Cache;
export function cache(config: ComponentConfiguration[]): Cache[];
export function cache(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): Cache | Cache[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new Cache(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new Cache(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new Cache(config.label, config);
}

export function processor(label: string, parentComponent?: Component): Processor;
export function processor(config: ComponentConfiguration): Processor;
export function processor(config: ComponentConfiguration[]): Processor[];
export function processor(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): Processor | Processor[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new Processor(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new Processor(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new Processor(config.label, config);
}

export function domain(label: string, parentComponent?: Component): Domain;
export function domain(config: ComponentConfiguration): Domain;
export function domain(config: ComponentConfiguration[]): Domain[];
export function domain(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): Domain | Domain[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new Domain(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new Domain(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new Domain(config.label, config);
}

export function device(label: string, parentComponent?: Component): Device;
export function device(config: ComponentConfiguration): Device;
export function device(config: ComponentConfiguration[]): Device[];
export function device(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): Device | Device[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new Device(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new Device(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new Device(config.label, config);
}

export function executionEnvironment(label: string, parentComponent?: Component): ExecutionEnvironment;
export function executionEnvironment(config: ComponentConfiguration): ExecutionEnvironment;
export function executionEnvironment(config: ComponentConfiguration[]): ExecutionEnvironment[];
export function executionEnvironment(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): ExecutionEnvironment | ExecutionEnvironment[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new ExecutionEnvironment(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new ExecutionEnvironment(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new ExecutionEnvironment(config.label, config);
}

export function schema(label: string, parentComponent?: Component): Schema;
export function schema(config: ComponentConfiguration): Schema;
export function schema(config: ComponentConfiguration[]): Schema[];
export function schema(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): Schema | Schema[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new Schema(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new Schema(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new Schema(config.label, config);
}

export function actor(label: string, parentComponent?: Component): Actor;
export function actor(config: ComponentConfiguration): Actor;
export function actor(config: ComponentConfiguration[]): Actor[];
export function actor(
  labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[],
  parentComponent?: Component,
): Actor | Actor[] {
  if (labelOrConfig instanceof Array) {
    return labelOrConfig.map((dbConfig) => new Actor(dbConfig.label, dbConfig));
  }
  if (typeof labelOrConfig === 'string') {
    const label = labelOrConfig as string;
    return new Actor(label, { parentComponent });
  }
  const config = labelOrConfig as ComponentConfiguration;
  return new Actor(config.label, config);
}
