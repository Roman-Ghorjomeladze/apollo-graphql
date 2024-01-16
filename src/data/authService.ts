import { GraphQLError } from 'graphql';
import { User } from '@prisma/client';
import { ERROR_CODES, ERROR_MESSAGES } from '@src/interfaces/common';
import prisma from '@src/prisma/client';

export const signUp = async (username: string, password: string, name: string): Promise<User> => {
  try {
    // Currently password is stored without hashing, in production apps I'm generaly using bcrypt to avoid storing plain passwords
    return prisma.user.create({
      data: {
        username,
        password,
        name,
      },
    });
  } catch (error) {
    throw new GraphQLError(ERROR_MESSAGES.SOMETHING_WRONG, { extensions: { code: ERROR_CODES.SOMETHING_WRONG } });
  }
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
  try {
    return await prisma.user.findFirst({ where: { username } });
  } catch (error) {
    throw new GraphQLError(ERROR_MESSAGES.SOMETHING_WRONG, { extensions: { code: ERROR_CODES.SOMETHING_WRONG } });
  }
};

export const findUserById = async (userId: number) => {
  try {
    return await prisma.user.findFirst({ where: { id: userId } });
  } catch (error) {
    throw new GraphQLError(ERROR_MESSAGES.UNAUTHORISED_EXCEPTION, {
      extensions: { code: ERROR_CODES.UNAUTHORISED_EXCEPTION },
    });
  }
};
