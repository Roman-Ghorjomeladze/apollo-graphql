import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const GqlUser = new GraphQLObjectType({
  name: 'GqlUser',
  description: 'Graphql User',
  fields: {
    name: {
      type: GraphQLString,
      description: 'Name of user',
    },
    username: {
      type: GraphQLString,
      description: 'Username of user',
    },
    id: {
      type: GraphQLInt,
      description: 'Id of user',
    },
  },
});
