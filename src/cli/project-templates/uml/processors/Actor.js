const nameToId = require("./lib/nameToId");

function preprocessFn(actors) {
  if (actors.name) {
    // Single actor in file, just add id.
    actors.id = nameToId(actors.name);
  } else {
    // Assume multiple actors in file, add id on each key based on name.
    Object.keys(actors).forEach((actorKey) => {
      const actor = actors[actorKey];
      if (actor.name) {
        actor.id = nameToId(actor.name);
      } else {
        throw new Error(`Actor "${actorKey}" doesn't have "name" property. Actor yaml must either be a single actor or object of actors.`)
      }
    })
  }
  return actors;
}

function postprocessFn(actor) {
  return actor;
}

module.exports = {
  preprocessFn,
  postprocessFn
}