const nameToId = require('./lib/nameToId');

function preprocessFn(useCaseModel) {
  const actorRefs = new Set();
  const componentRefs = new Set();
  const {usecases = []} = useCaseModel;
  usecases.forEach((usecase) => {
    const {actors = []} = usecase;
    usecase.id = nameToId(usecase.name);
    actors.forEach(({actor, uses}) => {
      actorRefs.add(actor.$ref);
      uses.forEach((uiRef) => componentRefs.add(uiRef.$ref));
    });
  });
  useCaseModel.id = nameToId(useCaseModel.name); // TODO: sanitizer util
  useCaseModel.actors = [ ...actorRefs ].map((ref) => ({$ref: ref}))
  useCaseModel.uis = [ ...componentRefs ].map((ref) => ({$ref: ref}));
  return useCaseModel;
}

function postprocessFn(useCaseModel) {
  const { usecases = {}, uis = [] } = useCaseModel;
  const useCasesArr = Object.values(usecases);
  useCaseModel.components = [ ...uis, ...uis.reduce((components, ui) => {
    const {system: { relationships = [] } = {}} = ui;
    relationships.forEach((relationship) => {
      if(relationship.source === ui) components.add(relationship.target);
    });
    return components;
  }, new Set())];
  useCaseModel.systems = [...new Set(useCaseModel.components.map((component) => component.system))];
  useCaseModel.relationships = {
    system: [...useCasesArr.reduce((relationships, {name: useCaseName, actors = []}) => {
              actors.forEach(({actor, uses = []}) => {
                uses.forEach((ui) => {
                  const id = `${actor.id}-${ui.system.id}`;
                  const relationship = relationships.get(id);
                  if(relationship) {
                    relationship.useCases.push(useCaseName);
                  } else {
                    relationships.set(id, { source: actor, target: ui.system, useCases: [ useCaseName ]});
                  }
                })
              });
              return relationships;
            }, new Map()).values(),
          ],
    component: [...useCasesArr.reduce((relationships, {name: useCaseName, actors = []}) => {
      actors.forEach(({actor, uses = []}) => {
        uses.forEach((ui) => {
          const id = `${actor.id}-${ui.id}`;
          const relationship = relationships.get(id);
          if(relationship) {
            relationship.useCases.push(useCaseName);
          } else {
            relationships.set(id, { source: actor, target: ui, useCases: [ useCaseName ]});
          }
        })
      });
      return relationships;
    }, new Map()).values(),
    ...uis.reduce((relationships, ui) => {
      const {system: { relationships: systemRelationships = [] } = {}} = ui;
      systemRelationships.forEach((relationship) => {
        if(relationship.source === ui) relationships.add(relationship);
      });
      return relationships;
    }, new Set()).values()
  ],
  }
  return useCaseModel;
}

module.exports = {
  preprocessFn,
  postprocessFn,
};
