import * as fs from 'fs';
import path from 'path';
import * as schemaAstPlugin from '@graphql-codegen/schema-ast';
import { parse, printSchema } from 'graphql';
import { Types } from '@graphql-codegen/plugin-helpers';
import { codegen } from '@graphql-codegen/core';
import { PrismaClient } from '@prisma/client';
import schema from './schema/schema';

async function performCodegen(options: Types.GenerateOptions): Promise<void> {
  const output = await codegen(options);
  fs.writeFile(path.join(__dirname, '/generated', options.filename), output, () => {
    console.log('Output generated');
  });
}

// eslint-disable-next-line import/prefer-default-export
export async function performAstCodegen(): Promise<void> {
  const options: Types.GenerateOptions = {
    config: {
      numericEnums: true,
      contextType: { prisma: PrismaClient },
      useIndexSignature: true,
    },
    documents: [],
    filename: 'schema.graphql',
    schema: parse(printSchema(schema)),
    plugins: [{ 'schema-ast': {} }],
    pluginMap: {
      'schema-ast': schemaAstPlugin,
    },
  };
  try {
    performCodegen(options);
  } catch (err) {
    console.error(err);
  }
}
