const nameToId = require('./lib/nameToId');

function preprocessFn(schema) {
  Object.keys(schema.users).forEach((userKey) => {
    schema.users[userKey].id = nameToId(userKey);
  });
  schema.usecases.forEach((usecase) => {
    usecase.id = nameToId(usecase.name);
  });
  schema.id = nameToId(schema.name); // TODO: sanitizer util
  return schema;
}

function postprocessFn(schema) {
  return schema;
}

module.exports = {
  preprocessFn,
  postprocessFn,
};
