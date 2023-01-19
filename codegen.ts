import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost/news-project/graphql",
  documents: ["app/**/*.tsx"],
  debug: true,
  config: { skipTypename: true },
  generates: {
    "./schema.json": {
      plugins: ["introspection"],
      config: { minify: true },
    },
    "./graphql/graphql-request.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
