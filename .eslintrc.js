module.exports = {
    env: {
      es2021: true,
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 13,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {},
    extends: [ 'airbnb-base', 'airbnb-typescript/base'],
    parserOptions: {
      project: './tsconfig.json'
    },
    rules: {
      'no-underscore-dangle': [0],
      'no-console': [0],
      'max-len': [2, 140],
      'import/prefer-default-export': [0]
    }
  }