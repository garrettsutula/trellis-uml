export default `{
  "yaml.schemas": {
    "schemas/Actor.schema.json": "models/Domain/actors.yaml",
    "schemas/System.schema.json":"models/Systems/**/*.yaml"
  },
  "files.exclude": {
    "**/temp/**": true
  }
}`;
