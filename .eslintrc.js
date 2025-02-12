module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended'
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
    'markel-plugin'
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
    ]
  }
}
