import { Books } from 'src/mongoose/schemas/books.schema';

export const booksStub = (): Books => {
  return {
    id: '629f6033c26de1340d85d460',
    title: 'Title',
    description: 'Description',
    authors: 'Authors',
    favorite: 'Favorite',
    fileCover: 'FileCover',
    fileName: 'FileName',
    fileBook: 'FileBook',
  };
};
