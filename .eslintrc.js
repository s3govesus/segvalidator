module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'quotes': [2, 'backtick'],
    'prefer-const': 1,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'spaced-comment': 0,
    'no-param-reassign': 0,
  },
};
