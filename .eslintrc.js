/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['plugin:@codecb/tsReact'],
  settings: {
    react: {
      version: '>=17.0.0',
    },
  },
};
