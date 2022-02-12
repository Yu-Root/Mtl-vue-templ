module.exports = {
  root: true,
  extends: ['prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    document: true,
    console: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
