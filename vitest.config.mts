import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Vite 8 resolves the `@/*` alias from tsconfig.json natively.
    tsconfigPaths: true,
  },
  test: {
    // Domain logic is framework-free, so a plain Node environment is enough.
    // Component tests will opt into a DOM environment per file later.
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
