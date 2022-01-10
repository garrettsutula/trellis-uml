import { ComponentRelationship } from '../../models';

export default (relationship: ComponentRelationship, tabIndex: number = 1): string => {
  let output = `${'\t'.repeat(tabIndex)}`;
  output += `${relationship.source.id} ${relationship.diagramFragmentBefore}${relationship.diagramFragmentAfter} ${relationship.target.id}`;
  if (relationship.description) output += `: ${relationship.description}`;
  return `${output}\n`;
};
