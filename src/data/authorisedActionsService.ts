import { AuthorisedAction } from '@prisma/client';
import prisma from '@src/prisma/client';
import { throwSomethingWrongError } from '@src/utils/formatError';

export const createAuthorisedActionLog = async (
  userId: number,
  body: string,
  key: string,
  typename: string,
  variables: string
): Promise<AuthorisedAction | undefined> => {
  try {
    return await prisma.authorisedAction.create({
      data: {
        user_id: userId,
        body,
        key,
        typename,
        variables,
      },
    });
  } catch (error) {
    return throwSomethingWrongError();
  }
};

export const getAllAuthorisedActions = async (userId: number): Promise<AuthorisedAction[]> => {
  try {
    return await prisma.authorisedAction.findMany({ where: { user_id: userId } });
  } catch (error) {
    return throwSomethingWrongError();
  }
};
