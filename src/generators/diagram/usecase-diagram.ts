import { escapeString } from '../../common/utils';
import { Entity, UseCaseModel } from '../../models';
import { titleAndHeader, startUml, endUml } from '../diagram-fragment/chrome';

function buildTableMarkup(entities: Entity[]): string {
  return entities.reduce((acc, entity) => `${`${acc
  }| ${entity.entity.name} |${
    ['c', 'r', 'u', 'd']
      .reduce((crudMarkup, verb) => (entity.crudOperations.includes(verb) ? `${crudMarkup} X |` : `${crudMarkup}   |`), '')}`
  }\n`, '');
}

export const buildUseCaseDiagram = (name: string, usecaseModel: UseCaseModel): string => {
  let output: string = startUml(`Usecase Model ${name}`);

  output += titleAndHeader(name, 'Usecase Model');
  output += usecaseModel.actors.reduce((acc, actor): string => `${acc}:${actor.label}: as ${actor.id}\n`, '');
  output += Object.values(usecaseModel.useCases).reduce((acc, usecase) => `${acc}usecase ${escapeString(usecase.title)} as "
  **${usecase.title}**

  == Description ==

  ${usecase.description}

  ${usecase.entities?.length ? `== Entities ==

  |= Type |= C |= R |= U |= D |
  ${buildTableMarkup(usecase.entities)}` : ''}
  "
  `, '');
  output += usecaseModel.useCaseRelationships
    .reduce((acc, relationship) => `${relationship.diagramFragmentBefore}${relationship.diagramFragmentAfter}`, '');
  output += endUml();
  return output;
};
