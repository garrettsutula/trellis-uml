import { BaseRelationship } from '../../models/base';

export default (relationship: BaseRelationship, tabIndex: number = 1): string => {
  let output = `${'\t'.repeat(tabIndex)}`;
  output += `${relationship.source.id} ${relationship.diagramFragmentBefore}${relationship.diagramFragmentAfter} ${relationship.target.id}`;
  output += `: ${relationship.stereotype}`;
  if (relationship.description) output += `\\n${relationship.description}`;
  return `${output}\n`;
};
