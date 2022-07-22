export default (schema, postprocessFn) => {
  if (postprocessFn) return postprocessFn(schema);
  return schema;
};
