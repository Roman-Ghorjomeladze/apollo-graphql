import { GraphQLResolveInfo } from 'graphql';
import { User } from '@prisma/client';
import prismaMock from '../__mocks__/prismaSingleton';
import { signUp } from '@src/data/authService';
import { query } from '@src/graphql/schema/resolvers/query/query';
import { IApolloServerContext } from '@src/interfaces/IApolloServerContext';
import { SignInResponse } from '@src/interfaces/AuthRequest';
import { ResolverFn } from '@src/graphql/generated/graphql';
import { IResolverFN } from '@src/interfaces/common';

describe('Auth service test', () => {
  const mockUser: User = {
    id: 1,
    name: 'james',
    username: 'james',
    password: 'pwd',
  };

  test('It should return message when signUp is called', async () => {
    jest.spyOn(prismaMock.user, 'create').mockResolvedValue(mockUser);
    const user = await signUp(mockUser.username, mockUser.password, mockUser.name);
    expect(user).toBe(mockUser);
    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
  });

  describe('Test SignInResolver', () => {
    it('Should check if signIn resolver is set into schema correctly', () => {
      const signInSchema = query.getFields().signIn;
      const signInResolver = signInSchema.resolve;
      expect(signInSchema).toBeDefined();
      expect(signInResolver).toBeDefined();
    });

    it('Should throw an error when findFirst not finds user', async () => {
      jest.spyOn(prismaMock.user, 'findFirst').mockResolvedValue(null);
      const signInSchema = query.getFields().signIn;
      const signInResolver: IResolverFN = signInSchema.resolve as IResolverFN;
      const ctx: IApolloServerContext = { user: null, token: '', prisma: prismaMock };
      expect(
        signInResolver(
          null,
          {
            input: {
              username: mockUser.username,
              password: mockUser.password,
            },
          },
          ctx,
          {} as GraphQLResolveInfo
        )
      ).rejects.toThrow();
    });

    it('should return valid response when findFirst finds a user', async () => {
      jest.spyOn(prismaMock.user, 'findFirst').mockResolvedValue(mockUser);
      const signInSchema = query.getFields().signIn;
      const signInResolver: ResolverFn<unknown, unknown, unknown, unknown> = signInSchema.resolve as ResolverFn<
        unknown,
        unknown,
        unknown,
        unknown
      >;
      const response: SignInResponse = (await signInResolver(
        null,
        {
          input: {
            username: mockUser.username,
            password: mockUser.password,
          },
        },
        {},
        {} as GraphQLResolveInfo
      )) as SignInResponse;

      expect(response).toHaveProperty('accessToken');
      expect(response).toHaveProperty('refreshToken');
      expect(response).toHaveProperty('user');
      expect(response.user).toBe(mockUser);
    });
  });
});
