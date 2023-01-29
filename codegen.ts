import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost/news-project/graphql",
  documents: [
    "app/**/*.{tsx,ts}",
    "components/**/*.{tsx,ts}",
    "graphql/fragments/**/*.{tsx,ts}",
    "graphql/queries/**/*.{tsx,ts}",
  ],
  debug: true,
  config: { skipTypename: true },
  generates: {
    "./schema.json": {
      plugins: ["introspection"],
      config: { minify: true },
    },
    "./graphql/codegen/graphql-request.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
