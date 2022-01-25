import { BaseRelationship } from '../../models/base';

export default (relationship: BaseRelationship, tabIndex: number = 1): string => {
  const sourceId = relationship.source.system ? `${relationship.source.system.id}_${relationship.source.id}` : relationship.source.id;
  const targetId = relationship.target.system ? `${relationship.target.system.id}_${relationship.target.id}` : relationship.target.id;
  let output = `${'\t'.repeat(tabIndex)}`;
  output += `${sourceId} ${relationship.diagramFragmentBefore}${relationship.diagramFragmentAfter} ${targetId}`;
  output += `: ${relationship.stereotype}`;
  if (relationship.description) output += `\\n${relationship.description}`;
  return `${output}\n`;
};
