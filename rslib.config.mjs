import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      index: "./src/index.ts",
    },
    tsconfigPath: "./tsconfig.lib.json",
  },
  output: {
    target: "node",
  },
  lib: [
    {
      format: "esm",
      syntax: "es2021",
      dts: true,
      autoExtension: false,
      output: {
        filename: {
          js: "[name].js",
        },
      },
    },
    {
      format: "cjs",
      syntax: "es2021",
      autoExtension: false,
      output: {
        filename: {
          js: "[name].cjs",
        },
      },
    },
  ],
});
