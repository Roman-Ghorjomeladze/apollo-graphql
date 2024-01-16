import { GraphQLObjectType } from 'graphql';
import getAllBooksQuery from './getAllBooksQuery';
import { SignInQuery } from './signInQuery';
import getAllAuthorisedActionsQuery from './getAllAuthorisedActionsQuery';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    books: getAllBooksQuery,
    signIn: SignInQuery,
    authorisedActions: getAllAuthorisedActionsQuery,
  },
});
