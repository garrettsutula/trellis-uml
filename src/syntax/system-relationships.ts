import {
  SystemCommunicationPath, CommunicationPathConfiguration,
  SystemFlowsInto, FlowsIntoConfiguration,
  SystemUses, SystemUsesConfiguration, System, Actor,
} from '../models';

export function communicationPath(source: System, target: System, description?: string): SystemCommunicationPath;
export function communicationPath(config: CommunicationPathConfiguration): SystemCommunicationPath;
export function communicationPath(
  sourceOrConfig: System | CommunicationPathConfiguration,
  target?: System,
  description?: string,
): SystemCommunicationPath {
  if (sourceOrConfig && target) {
    return new SystemCommunicationPath({ source: sourceOrConfig as System, target, description });
  }
  return new SystemCommunicationPath(sourceOrConfig as CommunicationPathConfiguration);
}

export function flowsInto(source: System, target: System, description?: string): SystemFlowsInto;
export function flowsInto(config: FlowsIntoConfiguration): SystemFlowsInto;
export function flowsInto(
  sourceOrConfig: System | FlowsIntoConfiguration,
  target?: System,
  description?: string,
): SystemFlowsInto {
  if (sourceOrConfig && target) {
    return new SystemFlowsInto({ source: sourceOrConfig as System, target, description });
  }
  return new SystemFlowsInto(sourceOrConfig as FlowsIntoConfiguration);
}

export function uses(source: System | Actor, target: System, description?: string): SystemUses;
export function uses(config: SystemUsesConfiguration): SystemUses;
export function uses(
  sourceOrConfig: System | Actor | SystemUsesConfiguration,
  target?: System,
  description?: string,
): SystemUses {
  if (sourceOrConfig && target) {
    return new SystemUses({ source: sourceOrConfig as System | Actor, target, description });
  }
  return new SystemUses(sourceOrConfig as FlowsIntoConfiguration);
}
