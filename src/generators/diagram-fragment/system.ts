import { System } from '../../models';

export default (system: System, tabIndex: number = 0, compoundIdentifier?: string) => {
  let output = '';
  let systemId = '';
  if (compoundIdentifier) {
    systemId = `${system.id}_${compoundIdentifier}_package`;
  } else {
    systemId = `${system.id}_package`;
  }
  output += `${'\t'.repeat(tabIndex)}`;
  output += `package "${system.name}" as ${systemId} <<System>>`;
  if (system.color) output += ` #${system.color}`;
  return output;
};
