import eslintRecommended from '@eslint/js';
import eslintPrettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
    {
        ignores: ['build/**/*', 'dist/**/*'],
        files: ['**/*.js'], // all JS files
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': 'warn',
            semi: ['error', 'always'],
            quotes: ['error', 'double'],
            curly: ['error', 'multi'],
            eqeqeq: 'error',
            'prefer-const': 'error',
            'prefer-arrow-callback': 'warn',
            'no-var': 'error',
            'no-empty-function': 'error',
            'no-duplicate-imports': 'error',
            'dot-notation': 'error',
            'no-else-return': 'error',
            'no-lonely-if': 'error',
            'no-nested-ternary': 'warn',
            'no-new-object': 'error',
            'prefer-template': 'error',
            'spaced-comment': ['error', 'always', { markers: ['/'] }],
            'sort-imports': ['error', { allowSeparatedGroups: true }],
        },
    },
    eslintPrettierConfig,
];
