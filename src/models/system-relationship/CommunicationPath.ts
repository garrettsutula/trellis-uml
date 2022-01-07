import { SystemRelationship } from './SystemRelationship';

type AppProtocol = 'DNS' | 'DHCP' | 'TFTP' | 'TLS/SSL' | 'FTP' | 'HTTP' | 'HTTPS' | 'IMAP4' |
'POP3' | 'SMTP' | 'SNMP' | 'SSH' | 'Telnet' | 'RTP' | 'SFTP';

type NetworkProtocol = 'TCP' | 'UDP';

export class CommunicationPath extends SystemRelationship {
  diagramFragmentBefore: string = '-';

  diagramFragmentAfter: string = 'down-(';

  ports: string | string[];

  appProtocols: AppProtocol | AppProtocol[];

  networkProtocols: NetworkProtocol | NetworkProtocol[];
}
