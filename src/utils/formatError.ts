import { GraphQLError } from 'graphql';
import { ValidationError } from 'yup';
import { ERROR_CODES, ERROR_MESSAGES } from '@src/interfaces/common';

export const throwGraphqlError = (message: ERROR_MESSAGES | string, code: ERROR_CODES, messages?: string[]) => {
  throw new GraphQLError(message, { extensions: { code, messages: messages || [message] } });
};

export const throwYumError = (e: unknown, code: ERROR_CODES = ERROR_CODES.BAD_USER_INPUT) => {
  const error: ValidationError = e as ValidationError;
  const message: string = error.message as string;
  const messages: string[] = error.errors;
  throwGraphqlError(message, code, messages);
};

export const throwSomethingWrongError = () => {
  throw new GraphQLError(ERROR_MESSAGES.SOMETHING_WRONG, {
    extensions: { code: ERROR_CODES.SOMETHING_WRONG },
  });
};

export const throwUnAuthorisedError = () => {
  throw new GraphQLError(ERROR_MESSAGES.UNAUTHORISED_EXCEPTION, {
    extensions: { code: ERROR_CODES.UNAUTHORISED_EXCEPTION },
  });
};
