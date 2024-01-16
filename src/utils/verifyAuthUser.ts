import { IncomingMessage } from 'http';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { Config } from '@src/config/config';
import { findUserById } from '@src/data/authService';
import { IJWTPayload } from '@src/interfaces/AuthRequest';
import { checkIfTokenBlocked } from '@src/data/blockListService';

export const verifyAuthUser = async (req: IncomingMessage): Promise<{ user: User | null; token: string }> => {
  const token = req.headers.authorization || '';
  const isIntrospectionQuery = req['body'] && req['body'].operationName && req['body'].operationName === 'IntrospectionQuery';
  let user: User | null = null;
  if (token && !isIntrospectionQuery) {
    try {
      const payload: IJWTPayload = jwt.verify(token, Config.getJWTSecret()) as IJWTPayload;
      const tokenInBlockList = await checkIfTokenBlocked(token);
      if (!tokenInBlockList) {
        user = await findUserById(payload.id);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return { user, token };
};
