module.exports = async (schema) => {
  schema.id = schema.name;

  Object.keys(schema.elements).forEach((elementKey) => {
    const element = schema.elements[elementKey];
    // Adds a back-reference to each component so system name is easily accessible from {component}.parent.name
    element.parent = { $ref: '#' };
    element.id = element.name; // TODO: sanitizer util
    element.relationships.forEach((relationship) => {
      // Indicate if the reference is external, useful for conditional output in templates.
      relationship.isExternalRef = !relationship.target.$ref.startsWith('#');
    });
  });
  // Adds system id
  schema.id = schema.name; // TODO: sanitizer util
  return schema;
};
