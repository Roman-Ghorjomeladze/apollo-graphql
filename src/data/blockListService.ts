import prisma from '@src/prisma/client';
import { throwSomethingWrongError } from '@src/utils/formatError';

export const addTokenToBlockList = async (token: string): Promise<void> => {
  try {
    await prisma.jWTBlockList.create({ data: { token } });
  } catch (error) {
    throwSomethingWrongError();
  }
};

export const checkIfTokenBlocked = async (token: string): Promise<boolean> => {
  const blockedToken = await prisma.jWTBlockList.findFirst({ where: { token } });
  return !!blockedToken;
};
