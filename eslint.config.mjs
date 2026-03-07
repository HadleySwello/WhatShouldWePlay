import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    ignores: ['node_modules', 'build', 'dist'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "JSXAttribute[name.name='style'] > JSXExpressionContainer > ObjectExpression",
          message:
            'Inline styles are banned. Use theme tokens, layout helpers, or App* components.',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '**/helpers/colors',
                '../helpers/colors',
                '../../helpers/colors',
              ],
              message:
                'Import colors via useAppTheme() or theme tokens. Only theme/tokens.js may import helpers/colors.',
            },
          ],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['theme/tokens.js'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['screens/**/*.js'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "JSXAttribute[name.name='style'] > JSXExpressionContainer > ObjectExpression",
          message:
            'Inline styles are banned. Use theme tokens, layout helpers, or App* components.',
        },
        {
          selector:
            "CallExpression[callee.object.name='StyleSheet'][callee.property.name='create']",
          message:
            'StyleSheet.create is banned in screens. Use theme components and layout helpers.',
        },
      ],
    },
  },
  {
    files: ['components/**/*.js'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "JSXAttribute[name.name='style'] > JSXExpressionContainer > ObjectExpression",
          message:
            'Inline styles are banned. Use theme tokens, layout helpers, or App* components.',
        },
      ],
    },
  },
  eslintConfigPrettier,
];
