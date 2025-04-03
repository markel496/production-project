module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended',
    'plugin:cypress/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}', 'loki.config.js', 'scripts/**/*.js'],
      parserOptions: {
        sourceType: 'script'
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'i18next',
    'react-hooks',
    'markel-plugin',
    'unused-imports',
    'cypress'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix'
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/no-deprecated': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_[a-zA-Z]+$',
        argsIgnorePattern: '^_+$|^_[a-zA-Z]+$'
      }
    ],
    'react/button-has-type': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react/display-name': 'off',
    'markel-plugin/path-checker': [
      'error',
      {
        alias: '@'
      }
    ],
    'markel-plugin/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/StoreDecorator.tsx']
      }
    ],
    'markel-plugin/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing']
      }
    ],
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'warn',
      {
        groups: [
          // Imports of builtins are first
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'type'
        ],
        pathGroups: [
          {
            // Minimatch pattern used to match against specifiers
            pattern: '@/**',
            // The predefined group this PathGroup is defined in relation to
            group: 'internal',
            // How matching imports will be positioned relative to "group"
            position: 'before'
          }
        ],
        'newlines-between': 'always-and-inside-groups'
      }
    ],
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }]
  }
}
