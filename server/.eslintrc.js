module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'ignorePatterns': ['tests/', 'node_modules/', 'dist/'],
  'rules': {
    'valid-jsdoc': 1,
    'no-invalid-this': 1,
    'require-jsdoc': 0,
    'max-len': [1, 120, 2],
    'object-curly-spacing': [
      'error',
      'always',
    ],
  },
};
