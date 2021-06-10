module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'max-len': 'off',
    camelcase: 'off',
    indent: ['error', 2],
    'no-await-in-loop': 'off',
  },
};
