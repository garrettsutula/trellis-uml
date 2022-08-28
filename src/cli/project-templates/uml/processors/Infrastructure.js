const nameToId = require("./lib/nameToId");

function preprocessFn(infrastructures) {
  if (infrastructures.name) {
    // Single actor in file, just add id.
    infrastructures.id = nameToId(infrastructures.name);
  } else {
    // Assume multiple actors in file, add id on each key based on name.
    Object.keys(infrastructures).forEach((actorKey) => {
      const actor = infrastructures[actorKey];
      if (actor.name) {
        actor.id = nameToId(actor.name);
      } else {
        throw new Error(`Actor "${actorKey}" doesn't have "name" property. Actor yaml must either be a single actor or object of actors.`)
      }
    })
  }
  return infrastructures;
}

function postprocessFn(infrastructures) {
  return infrastructures;
}

module.exports = {
  preprocessFn,
  postprocessFn
}