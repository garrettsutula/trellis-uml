const nameToId = require('./lib/nameToId');

module.exports = async (schema) => {
  const { components = [] } = schema;
  Object.keys(components).forEach((componentKey) => {
    const component = schema.components[componentKey];
    // Adds a back-reference to each component so system name is easily accessible from {component}.parent.name
    component.parent = { $ref: '#' };
    component.id = nameToId(component.name);
    component.type = 'component';
  });
  schema.id = nameToId(schema.name);
  schema.type = 'system';
  return schema;
};
