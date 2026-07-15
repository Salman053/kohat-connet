import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Allow fetch functions in CRUD pages to be called before declared
      'react-hooks/immutability': 'warn',
      // Allow setState in effect callbacks for data fetching
      'react-hooks/set-state-in-effect': 'warn',
      // Allow ref access during render for one-time initialization
      'react-hooks/refs': 'warn',
      // Allow Math.random in theme/animation components
      'react-hooks/purity': 'warn',
    },
  },
  {
    files: ['**/__tests__/**', '**/*.test.*', '**/mocks/**', 'src/test/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/api/**/route.ts', '**/admin/**/page.tsx', '**/admin/**/layout.tsx', '**/dashboard/**/page.tsx', '**/dashboard/**/layout.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/{animated,landing,sections,shared}/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/(public)/**/*.tsx', '**/auth/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]);

export default eslintConfig;
