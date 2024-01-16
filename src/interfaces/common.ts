import { ResolverFn } from '@src/graphql/generated/graphql';

export enum ERROR_CODES {
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  SOMETHING_WRONG = 'SOMETHING_WRONG',
  UNAUTHORISED_EXCEPTION = 'UNAUTHORISED_EXCEPTION',
}

export enum ERROR_MESSAGES {
  USER_NOT_FOUND = 'User with such credentials not found!',
  BAD_PASSWORD = 'Password should be at least 6 characters, one number and one upper case letter!',
  SOMETHING_WRONG = 'Something went wrong, try again later!',
  UNAUTHORISED_EXCEPTION = 'Error, unauthorised access!',
}

export type IResolverFN = ResolverFn<unknown, unknown, unknown, unknown>;
