/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { Entity, UseCaseModel } from '../../models';
import { titleAndHeader, startUml, endUml } from '../diagram-fragment/chrome';

function buildTableMarkup(entities: Entity[] = []): string {
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
  output += Object.values(usecaseModel.useCases).reduce(
    (acc, usecase) => {
      acc += `usecase ${usecase.id} as "
    **${usecase.title}**

    == Description ==
  
    ${usecase.description}
    

    `;
      if (usecase.entities?.length) {
        acc += `== Entities ==

      |= Type |= C |= R |= U |= D |
      ${buildTableMarkup(usecase.entities)}`;
      }
      acc += '\n"\n\n';
      return acc;
    },
    '',
  );
  output += usecaseModel.useCaseRelationships
    .reduce((acc, relationship) => `${acc}${relationship.source.id} ${relationship.diagramFragmentBefore}${relationship.diagramFragmentAfter} ${relationship.target.id}\n`, '');
  output += endUml();
  return output;
};
