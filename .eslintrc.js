module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react/recommended',
        'eslint-config-prettier',
        // 'plugin:react/jsx-runtime',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'indent': ['error', 4],
        'no-multi-spaces': ['error'],
        'react/prop-types': 'off'
    },
};
