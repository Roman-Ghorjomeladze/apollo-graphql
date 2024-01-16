import { GraphQLList } from 'graphql';
import { Book } from '@prisma/client';
import GqlBook from '@src/graphql/schema/typeDefs/GqlBook';
import { getAllBooks } from '@src/data/bookService';

const getAllBooksQuery = {
  type: new GraphQLList(GqlBook),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  resolve: (): Promise<Book[]> => {
    return getAllBooks();
  },
};

export default getAllBooksQuery;
