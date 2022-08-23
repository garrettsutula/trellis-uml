const nameToId = require('./lib/nameToId');

function preprocessFn(model) {
  const actorRefs = new Set();
  const {usecases = []} = model;
  usecases.forEach((usecase) => {
    const {actors = []} = usecase;
    usecase.id = nameToId(usecase.name);
    actors.forEach(({actor}) => actorRefs.add(actor.$ref));
  });
  model.id = nameToId(model.name); // TODO: sanitizer util
  model.actors = Array.from(actorRefs.values()).map((ref) => {
    return {$ref: ref};
  });
  return model;
}

function postprocessFn(schema) {
  return schema;
}

module.exports = {
  preprocessFn,
  postprocessFn,
};
