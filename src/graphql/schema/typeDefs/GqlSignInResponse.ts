import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GqlUser } from './GqlUser';

export const GqlSignInResponse = new GraphQLObjectType({
  name: 'GqlSignInResponse',
  description: 'Sign in response',
  fields: {
    user: {
      type: GqlUser,
      description: 'User object',
    },
    accessToken: {
      type: GraphQLString,
      description: 'Access token',
    },
    refreshToken: {
      type: GraphQLString,
      description: 'Refresh token',
    },
  },
});
