import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

/**
 * Layer boundaries (see docs/architecture.md):
 *   app → features → server → domain
 *   domain imports nothing from the app or any framework.
 */
const domainMessage = "src/domain must stay framework-free (pure TypeScript only).";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    files: ["src/domain/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: ["react", "react-dom", "next"].map((name) => ({ name, message: domainMessage })),
          patterns: [
            {
              group: ["react/*", "react-dom/*", "next/*", "@supabase/*"],
              message: domainMessage,
            },
            {
              group: ["@/app/*", "@/features/*", "@/server/*", "@/ui/*", "@/lib/*"],
              message: "src/domain may only import from src/domain.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/server/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app/*", "@/features/*", "@/ui/*"],
              message: "src/server must not depend on UI layers.",
            },
          ],
        },
      ],
    },
  },
  // Must stay last: turns off stylistic rules that conflict with Prettier.
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
