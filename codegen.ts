import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/generated/schema.graphql',
  generates: {
    'src/graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: 'src/prisma/IPrismaContext#IPrismaContext',
        useIndexSignature: true,
      },
    },
  },
};

export default config;
