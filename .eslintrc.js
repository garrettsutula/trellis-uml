module.exports = {
    env: {
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 6,
      project: './tsconfig.json'
    },
    plugins: ['@typescript-eslint'],
    rules: {},
    extends: ['airbnb-base', 'airbnb-typescript/base'],
    rules: {
      'no-underscore-dangle': [0],
      'no-console': [0],
      'max-len': [2, 140],
      'import/prefer-default-export': [0],
      'import/no-cycle': [0],
      'no-param-reassign': [0],
    },
    ignorePatterns: ["dist/**/*", ".eslintrc.js"]
  }