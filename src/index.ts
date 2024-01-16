import dotenv from 'dotenv-safe';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from '@src/graphql/schema/schema';
import prisma from '@src/prisma/client';
import { performAstCodegen } from '@src/graphql/codegen';
import { verifyAuthUser } from './utils/verifyAuthUser';

dotenv.config();

const bootstrap = async () => {
  await performAstCodegen();
  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const { user, token } = await verifyAuthUser(req);
      return {
        prisma,
        user,
        token,
      };
    },
  });
  console.log(`Server ready at ${url}graphql`);
};

bootstrap();
