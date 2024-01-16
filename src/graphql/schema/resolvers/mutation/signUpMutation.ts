import { GraphQLNonNull } from 'graphql';
import { SignUpInput } from '../../typeDefs/SignUpInput';
import { signUp } from '@src/data/authService';
import { SignUpRequest } from '@src/interfaces/AuthRequest';
import GqlSignUp from '../../typeDefs/GqlSignUp';

export const signUpMutation = {
  type: GqlSignUp,
  args: {
    input: {
      type: new GraphQLNonNull(SignUpInput),
      description: 'Input fields to sign up',
    },
  },
  resolve: async (
    // eslint-disable no-unused-vars
    _source: unknown,
    { input: { username, password, name } }: SignUpRequest
  ): Promise<{ message: string }> => {
    await signUp(username, password, name);
    return { message: 'Registration was successful' };
  },
};
