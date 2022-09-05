const nameToId = require('./lib/nameToId');

function preprocessFn(useCaseModel) {
  const actorRefs = new Set();
  const {usecases = []} = useCaseModel;
  usecases.forEach((usecase) => {
    const {actors = []} = usecase;
    usecase.id = nameToId(usecase.name);
    actors.forEach(({actor}) => actorRefs.add(actor.$ref));
  });
  useCaseModel.id = nameToId(useCaseModel.name); // TODO: sanitizer util
  useCaseModel.actors = Array.from(actorRefs.values()).map((ref) => {
    return {$ref: ref};
  });
  return useCaseModel;
}

function postprocessFn(useCaseModel) {
  return useCaseModel;
}

module.exports = {
  preprocessFn,
  postprocessFn,
};
