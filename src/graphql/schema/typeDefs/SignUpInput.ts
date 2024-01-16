import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const SignUpInput = new GraphQLInputObjectType({
  name: 'SingUpInput',
  description: 'Sign up input',
  fields: {
    username: {
      type: GraphQLString,
      description: 'Username of the user',
    },
    password: {
      type: GraphQLString,
      description: 'Password of the user',
    },
    name: {
      type: GraphQLString,
      description: 'Name of the user',
    },
  },
});
