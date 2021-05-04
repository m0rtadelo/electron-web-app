module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
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
  'ignorePatterns': ['tests/', 'node_modules/', 'dist/', 'assets/'],
  'rules': {
    'require-jsdoc': 0,
    'max-len': [2, 120, 2],
    'object-curly-spacing': [
      'error',
      'always',
    ],
  },
};
