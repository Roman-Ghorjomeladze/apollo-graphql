import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const SignInInput = new GraphQLInputObjectType({
  name: 'SignInInput',
  description: 'Sign in input',
  fields: {
    username: {
      type: GraphQLString,
      description: 'Usranme of the user',
    },
    password: {
      type: GraphQLString,
      description: 'Usranme of the user',
    },
  },
});
