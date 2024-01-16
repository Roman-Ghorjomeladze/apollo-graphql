import { GraphQLList } from 'graphql';
import { AuthorisedAction } from '@prisma/client';
import { IApolloServerContext } from '@src/interfaces/IApolloServerContext';
import { rejectIfUnAuthorised } from '@src/utils/rejectIfUnAuthorised';
import GqlAuthorisedAction from '../../typeDefs/GqlAuthorisedAction';
import { getAllAuthorisedActions } from '@src/data/authorisedActionsService';

const getAllAuthorisedActionsQuery = {
  type: new GraphQLList(GqlAuthorisedAction),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  resolve: async (_source: unknown, _args: unknown, _context: IApolloServerContext): Promise<AuthorisedAction[]> => {
    rejectIfUnAuthorised(_context);
    return getAllAuthorisedActions(_context.user?.id as number);
  },
};

export default getAllAuthorisedActionsQuery;
