export default {
  name: 'includes', 
  helperFn: function (collection, value, options) {
    if (Array.isArray(collection)) {
      return collection.includes(value) ? options.fn(this) : options.inverse(this);
    }
    return options.inverse(this);
  },
};