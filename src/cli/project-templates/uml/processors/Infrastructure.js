const nameToId = require("./lib/nameToId");

function preprocessFn(infrastructures) {
  infrastructures.id = nameToId(infrastructures.name);
  return infrastructures;
}

function postprocessFn(infrastructures) {
  return infrastructures;
}

module.exports = {
  preprocessFn,
  postprocessFn
}