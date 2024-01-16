import { PrismaClient, User } from '@prisma/client';

export interface IApolloServerContext {
  prisma: PrismaClient;
  user: User | null;
  token: string | null;
}
