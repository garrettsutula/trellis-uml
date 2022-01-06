export default `{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "jsx": false,
      "dynamicImport": false,
      "privateMethod": false,
      "functionBind": false,
      "exportDefaultFrom": false,
      "exportNamespaceFrom": false,
      "decorators": true,
      "decoratorsBeforeExport": false,
      "topLevelAwait": false,
      "importMeta": false
    },
    "target": "es2016",
    "loose": false,
    "externalHelpers": false,
    "keepClassNames": false
  },
  "module": {
      "type": "commonjs"
    },
  "sourceMaps": true
}
`;