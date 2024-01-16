import { GraphQLObjectType, GraphQLString } from 'graphql';

const GqlSignOut = new GraphQLObjectType({
  name: 'SignOut',
  description: 'Sign Out',
  fields: {
    message: {
      type: GraphQLString,
      description: 'Message text',
    },
  },
});

export default GqlSignOut;
