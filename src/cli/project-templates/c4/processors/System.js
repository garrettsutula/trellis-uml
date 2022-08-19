const nameToId = require('./lib/nameToId');

function preprocessingFn(schema) {
  const { components = [] } = schema;
  Object.keys(components).forEach((componentKey) => {
    const component = schema.components[componentKey];
    // Adds a back-reference to each component so system name is easily accessible from {component}.parent.name
    component.parent = { $ref: '#' };
    component.id = nameToId(component.name);
    component.modelType = 'component';
  });
  schema.id = nameToId(schema.name);
  schema.modelType = 'system';
  return schema;
}

function postprocessingFn(schema) {
  return schema;
}

module.exports = {
  preprocessingFn,
  postprocessingFn,
};
