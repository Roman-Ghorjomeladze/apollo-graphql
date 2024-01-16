import { Book } from '@prisma/client';
import prisma from '@src/prisma/client';
import { throwSomethingWrongError } from '@src/utils/formatError';

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    return prisma.book.findMany();
  } catch (error) {
    return throwSomethingWrongError();
  }
};

export const createBook = async (title: string, authorId: number, description: string): Promise<Book> => {
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author_id: authorId,
        description,
      },
    });
    return book;
  } catch (error) {
    return throwSomethingWrongError();
  }
};
