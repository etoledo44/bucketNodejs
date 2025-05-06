// eslint.config.cjs
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // opcional: nome do seu package.json
  baseDirectory: process.cwd(),
});

export default [
  // importa todas as regras do seu antigo .eslintrc
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ),
  {
    ignores: ['dist/**'],

    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },

    env: {
      node: true,
      es2020: true,
    },

    rules: {
      'prettier/prettier': 'error',
      // suas outras customizações aqui
    },
  },
];
