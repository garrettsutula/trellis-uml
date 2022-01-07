import { SystemRelationship } from './SystemRelationship';

export class CommunicationPath extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';
}

/*
CommunicationPathConfiguration {
  source: ExecutionEnvironment | Device | Domain | System;
  target: ExecutionEnvironment | Device | Domain | System;
  ports: string | string[];
  protocols: string | string[];
}
*/
