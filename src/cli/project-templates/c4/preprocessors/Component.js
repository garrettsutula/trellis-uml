const nameToId = require('./lib/nameToId');

function preprocessFn(schema) {
  const { elements = [] } = schema;
  Object.keys(elements).forEach((elementKey) => {
    const element = schema.elements[elementKey];
    // Adds a back-reference to each component so system name is easily accessible from {component}.parent.name
    element.parent = { $ref: '#' };
    element.id = nameToId(elementKey);
    element.modelType = 'codeElement';
    const { relationships = [] } = element;
    relationships.forEach((relationship) => {
      // Indicate if the reference is external, useful for conditional output in templates.
      relationship.isExternalRef = !relationship.target.$ref.startsWith('#');
    });
  });
  schema.parent = { $ref: '#' };
  schema.id = nameToId(schema.name);
  schema.modelType = 'component';
  return schema;
}

function postprocessFn(schema) {
  return schema;
}

module.exports = {
  preprocessFn,
  postprocessFn,
};
