import { GraphQLObjectType } from 'graphql';
import { createBookMutation } from './createBookMutation';
import { signUpMutation } from './signUpMutation';
import { signOutMutation } from './signOutMutation';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createBook: createBookMutation,
    signUp: signUpMutation,
    signOut: signOutMutation,
  },
});
