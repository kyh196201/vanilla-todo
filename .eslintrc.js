module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['html', 'import', 'prettier'],
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: false,
        printWidth: 80,
        tabWidth: 2,
        semi: true,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
      {
        usePrettierrc: false,
      },
    ],
    'no-unused-vars': 'error',
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'no-bitwise': 'off',
    'no-param-reassign': 'off',
    radix: 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        // alias
        root: ['.'],
        alias: {
          '@': './src',
          Components: './src/js/components',
          Store: './src/js/store',
          Api: './src/js/api',
          Utils: './src/js/utils',
          Core: './src/js/core',
          Config: './src/js/config',
          Lib: './src/js/lib',
        },
      },
    },
  },

  // webpack define plugin -> eslint no undef error
  globals: {
    FIREBASE_API_KEY: true,
    FIREBASE_AUTH_DOMAIN: true,
    FIREBASE_PROJECT_ID: true,
    FIREBASE_STORAGE_BUCKET: true,
    FIREBASE_MESSAGING_SENDER_ID: true,
    FIREBASE_APP_ID: true,
    FIREBASE_MEASUREMENT_ID: true,
  },
};
