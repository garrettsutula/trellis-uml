function nameToId(name) {
  return name.replace(/_{2}|_|\*|\(|\)/g, "").replace(/\n| |-|_|\.|:{2}|_{3}/g, "");
}

module.exports = async (schema) => {
  schema.id = nameToId(schema.name);
  const { elements = [] } = schema;
  Object.keys(elements).forEach((elementKey) => {
    const element = schema.elements[elementKey];
    // Adds a back-reference to each component so system name is easily accessible from {component}.parent.name
    element.parent = { $ref: '#' };
    element.id = nameToId(elementKey); // TODO: sanitizer util
    const { relationships = [] } = element;
    relationships.forEach((relationship) => {
      // Indicate if the reference is external, useful for conditional output in templates.
      relationship.isExternalRef = !relationship.target.$ref.startsWith('#');
    });
  });
  // Adds system id
  schema.id = nameToId(schema.name); // TODO: sanitizer util
  return schema;
};
