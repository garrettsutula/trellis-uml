import { SystemRelationship, SystemRelationshipConfiguration } from './SystemRelationship';

type AppProtocol = 'DNS' | 'DHCP' | 'TFTP' | 'TLS/SSL' | 'FTP' | 'HTTP' | 'HTTPS' | 'IMAP4' |
'POP3' | 'SMTP' | 'SNMP' | 'SSH' | 'Telnet' | 'RTP' | 'SFTP';

type NetworkProtocol = 'TCP' | 'UDP';

export class SystemCommunicationPath extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';

  ports?: string | string[];

  appProtocols?: AppProtocol | AppProtocol[];

  networkProtocols?: NetworkProtocol | NetworkProtocol[];

  constructor(config: CommunicationPathConfiguration) {
    super(config);

    this.ports = config.ports;
    this.appProtocols = config.appProtocols;
    this.networkProtocols = config.networkProtocols;
  }
}

export interface CommunicationPathConfiguration extends SystemRelationshipConfiguration {
  ports?: string | string[];
  appProtocols?: AppProtocol | AppProtocol[];
  networkProtocols?: NetworkProtocol | NetworkProtocol[];
}
