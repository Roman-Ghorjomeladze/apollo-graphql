import { GraphQLResolveInfo } from 'graphql';
import { User, Book } from '@prisma/client';
import prismaMock from '../__mocks__/prismaSingleton';
import { createBook } from '@src/data/bookService';
import { mutation } from '@src/graphql/schema/resolvers/mutation/mutation';
import { query } from '@src/graphql/schema/resolvers/query/query';
import { IApolloServerContext } from '@src/interfaces/IApolloServerContext';
import { IResolverFN } from '@src/interfaces/common';

describe('Book service test', () => {
  const bookMock: Book = {
    id: 1,
    title: 'Book title',
    description: 'Book description',
    author_id: 1,
  };

  const createBookSchema = mutation.getFields().createBook;
  const createBookResolver: IResolverFN = mutation.getFields().createBook.resolve as IResolverFN;

  test('It should check if schema and createBook resolver function exists', () => {
    expect(createBookSchema).toBeDefined();
    expect(createBookResolver).toBeDefined();
  });

  describe('Create book test with valid input', () => {
    test('It should create book with valid passed args', async () => {
      jest.spyOn(prismaMock.book, 'create').mockResolvedValue(bookMock);
      const book = await createBook(bookMock.title, bookMock.author_id, bookMock.description);
      expect(bookMock).toBe(book);
      expect(prismaMock.book.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.book.create).toHaveBeenCalledWith({
        data: {
          title: bookMock.title,
          author_id: bookMock.author_id,
          description: bookMock.description,
        },
      });
    });
  });

  describe('Create book test with invalid input', () => {
    const mockUser = { id: 1, name: 'John' } as User;
    const mockContext = { user: mockUser, prisma: prismaMock, token: '' };
    const invalidTitle = { description: 'Description' };
    const mockInfo: GraphQLResolveInfo = {
      variableValues: invalidTitle,
      operation: {},
      path: { key: '', typename: '' },
    } as unknown as GraphQLResolveInfo;
    jest.spyOn(prismaMock.book, 'create').mockResolvedValue(bookMock);

    const testInputPart = (scenario: string, inputPart: unknown) => {
      test(scenario, async () => {
        await expect(
          createBookResolver(null, { input: inputPart }, mockContext, mockInfo as GraphQLResolveInfo)
        ).rejects.toThrow();
      });
    };
    testInputPart('It should throw an error on invalid title', invalidTitle);
    const invalidDescription = { title: 'title' };
    testInputPart('It should throw an error on invalid description', invalidDescription);
    const emptyStrings = { title: '', description: '' };
    testInputPart('It should throw an error when the value of title and description is empty string', emptyStrings);
  });

  describe('Create book test without authorisation', () => {
    const mockContext = { user: null, prisma: prismaMock, token: '' };
    jest.spyOn(prismaMock.book, 'create').mockResolvedValue(bookMock);

    const testInputPart = (scenario: string) => {
      test(scenario, async () => {
        expect(createBookResolver(null, { input: {} }, mockContext, {} as GraphQLResolveInfo)).rejects.toThrow();
      });
    };
    testInputPart('It should throw an error when user has no authorisation');
  });

  describe('Get books service test', () => {
    test('It should get books', async () => {
      jest.spyOn(prismaMock.book, 'findMany').mockResolvedValue([bookMock]);

      const books = await prismaMock.book.findMany();
      expect(books).toBeDefined();
      expect(books.length).toBe(1);
      expect(prismaMock.book.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test fetch books resolver', () => {
    const bookSchema = query.getFields().books;
    const bookResolver: IResolverFN = bookSchema.resolve as IResolverFN;

    test('It should check if bookResolver is set into schema', () => {
      expect(bookSchema).toBeDefined();
      expect(bookResolver).toBeDefined();
    });

    test('It should fetch books without authorisation', async () => {
      jest.spyOn(prismaMock.book, 'findMany').mockResolvedValue([bookMock]);
      const books: Book[] = (await bookResolver(
        null,
        null,
        {} as IApolloServerContext,
        {} as GraphQLResolveInfo
      )) as Book[];
      expect(books.length).toBe(1);
      expect(prismaMock.book.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
