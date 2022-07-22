function preprocessFn(schema) {
  Object.keys(schema.components).forEach((componentKey) => {
    const component = schema.components[componentKey];
    // Adds a back-reference to each component so system name is easily accessible from {component}.parent.name
    component.parent = { $ref: '#' };
    component.id = component.name; // TODO: sanitizer util
  });
  // Adds system id
  schema.id = schema.name; // TODO: sanitizer util
  return schema;
}

function postprocessFn(schema) {
  return schema;
}

module.exports = {
  preprocessFn,
  postprocessFn,
};
