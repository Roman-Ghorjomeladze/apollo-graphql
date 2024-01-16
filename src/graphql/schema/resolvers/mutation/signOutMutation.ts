import { GraphQLResolveInfo } from 'graphql';
import { addTokenToBlockList } from '@src/data/blockListService';
import GqlSignOut from '../../typeDefs/GqlSignOut';
import { IApolloServerContext } from '@src/interfaces/IApolloServerContext';
import { rejectIfUnAuthorised } from '@src/utils/rejectIfUnAuthorised';

export const signOutMutation = {
  type: GqlSignOut,
  resolve: async (
    // eslint-disable no-unused-vars
    _source: unknown,
    _input: unknown,
    _context: IApolloServerContext,
    _info: GraphQLResolveInfo
  ): Promise<{ message: string }> => {
    rejectIfUnAuthorised(_context, _info);
    await addTokenToBlockList(_context.token as string);
    return { message: 'Signed out' };
  },
};
