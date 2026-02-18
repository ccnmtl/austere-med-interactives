import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from "eslint/config";
import path from 'path';
import { fileURLToPath } from 'url';
import eslintPluginCypress from 'eslint-plugin-cypress';
import eslintPluginReact from 'eslint-plugin-react';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default defineConfig( [
    ...compat.extends(
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ),
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                browser: true,
                amd: true,
                jquery: true,
                Cypress: true,
            },
        },
        plugins: {
            cypress: eslintPluginCypress,
            react: eslintPluginReact,
        },
        rules: {
            indent: ['error', 4],
            'linebreak-style': ['error', 'unix'],
            'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'max-len': ['error', { code: 80, tabWidth: 4, ignoreUrls: true }],
            'space-before-function-paren': ['error', 'never'],
            'space-in-parens': ['error', 'never'],
            'no-trailing-spaces': ['error'],
            'key-spacing': ['error', { beforeColon: false }],
            'func-call-spacing': ['error', 'never'],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptEslintParser,
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.json'],
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
        },
        rules: {
            'max-len': ['error', { code: 100, tabWidth: 4, ignoreUrls: true }],
        }
    },
    {
        ignores: ['*.json'],
    },
]);
