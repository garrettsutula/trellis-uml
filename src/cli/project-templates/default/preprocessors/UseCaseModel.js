const nameToId = require('./lib/nameToId.js');

module.exports  = async (schema) => {
  Object.keys(schema.users).forEach((userKey) => {
    schema.users[userKey].id = nameToId(userKey);
  });
  schema.usecases.forEach((usecase) => {
    usecase.id = nameToId(usecase.name);
  })
  schema.id = nameToId(schema.name); // TODO: sanitizer util
  return schema;
}
