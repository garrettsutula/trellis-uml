export enum ComponentType {
  UI = 'UI',
  Service = 'Service',
  Database = 'Database',
  ExecutionEnvironment = 'Execution Environment',
  API = 'API',
  Queue = 'Queue',
  Processor = 'Processor',
  Schema = 'Schema',
  Topic = 'Topic',
  EventQueue = 'Event Queue',
  Actor = 'Actor',
  System = 'System',
}

export enum LifecycleState {
  New = 'New',
  Modified = 'Modified',
  Deprecated = 'Deprecated',
}
