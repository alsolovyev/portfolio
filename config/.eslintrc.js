/**
 * Eslint rules:
 *  - https://eslint.org/docs/rules/
 *
 * Eslint recommended rules(eslint:recommended):
 *  - https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
 */
const { isDevMode } =  require('./utils')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  parser: 'babel-eslint',
  extends: 'eslint:recommended',
  rules: {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-console': isDevMode ? 'warn' : 'error'
  }
}
