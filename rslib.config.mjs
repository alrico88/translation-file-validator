import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      index: "./src/index.ts",
    },
  },
  output: {
    target: "node",
  },
  lib: [
    {
      format: "esm",
      syntax: "es2021",
    },
    {
      format: "cjs",
      syntax: "es2021",
    },
  ],
});
