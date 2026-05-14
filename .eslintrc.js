module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  env: {
    'react-native/react-native': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'error',
    // 開発初期の段階では、React 17以降のJSX Transformに対応するため以下のルールを無効化
    'react/react-in-jsx-scope': 'off',
    'react-native/no-raw-text': 'off', // 開発中のテキスト配置の柔軟性のため
    'react-native/no-color-literals': 'off',
    'react-native/sort-styles': 'off',
  },
};
