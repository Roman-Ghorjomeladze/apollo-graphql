import { GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
import { Book } from '@prisma/client';
import GqlBook from '@src/graphql/schema/typeDefs/GqlBook';
import { createBook } from '@src/data/bookService';
import { CreateBookInput } from '../../typeDefs/CreateBookInput';
import { CreateBookRequest } from '@src/interfaces/CreateBookRequest';
import { rejectIfUnAuthorised } from '@src/utils/rejectIfUnAuthorised';
import { IApolloServerContext } from '@src/interfaces/IApolloServerContext';
import { bookSchema } from '@src/validation/bookValidation';
import { throwYumError } from '@src/utils/formatError';

export const createBookMutation = {
  type: GqlBook,
  args: {
    input: {
      type: new GraphQLNonNull(CreateBookInput),
      description: 'Input fields to create book',
    },
  },
  resolve: async (
    // eslint-disable no-unused-vars
    _source: unknown,
    { input }: CreateBookRequest,
    _context: IApolloServerContext,
    _info: GraphQLResolveInfo
  ): Promise<Book> => {
    rejectIfUnAuthorised(_context, _info);
    try {
      await bookSchema.validate(input);
    } catch (error: unknown) {
      throwYumError(error);
    }
    const userId = _context.user?.id as number;
    return createBook(input.title, userId, input.description);
  },
};
