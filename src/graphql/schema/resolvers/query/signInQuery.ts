import { GraphQLError, GraphQLNonNull } from 'graphql';
import * as jwt from 'jsonwebtoken';
import { GqlSignInResponse } from '@src/graphql/schema/typeDefs/GqlSignInResponse';
import { SignInResponse } from '@src/interfaces/AuthRequest';
import { findUserByUsername } from '@src/data/authService';
import { SignInInput } from '@src/graphql/schema/typeDefs/SignInInput';
import { throwSomethingWrongError, throwYumError } from '@src/utils/formatError';
import { ERROR_CODES, ERROR_MESSAGES } from '@src/interfaces/common';
import { logInSchema } from '@src/validation/authValidation';
import { Config } from '@src/config/config';

export const SignInQuery = {
  type: GqlSignInResponse,
  args: {
    input: {
      type: new GraphQLNonNull(SignInInput),
      description: 'Sign in input',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  resolve: async (
    _source: unknown,
    body: { input: { username: string; password: string } }
  ): Promise<SignInResponse> => {
    try {
      await logInSchema.validate(body.input, { abortEarly: false });
    } catch (validationError: unknown) {
      throwYumError(validationError);
    }
    const user = await findUserByUsername(body.input.username);
    if (!user || user.password !== body.input.password) {
      throw new GraphQLError(ERROR_MESSAGES.USER_NOT_FOUND, { extensions: { code: ERROR_CODES.USER_NOT_FOUND } });
    }

    try {
      const SECRET: string = Config.getJWTSecret();
      const accessToken = jwt.sign({ id: user.id, fresh: true }, SECRET, { expiresIn: '9000000' });
      const refreshToken = jwt.sign({ id: user.id, fresh: false }, SECRET, { expiresIn: '1d' });
      return { user, accessToken, refreshToken };
    } catch (err) {
      console.log(err);
      return throwSomethingWrongError();
    }
  },
};
