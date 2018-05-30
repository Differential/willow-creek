module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: ['import', 'jsx-a11y', 'babel', 'prettier', 'jest', 'react'],
  rules: {
    'prettier/prettier': [
      'error',
      {singleQuote: true, trailingComma: 'es5', arrowParens: 'always'},
    ],
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': [2, {ignorePureComponents: true}],
    'import/no-extraneous-dependencies': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/require-default-props': 0,
    'function-paren-newline': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/media-has-caption': 0,
    'react-native/no-unused-styles': 0,
    'global-require': 0,
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
}
