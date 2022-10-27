import { Books } from '../../../mongoose/schemas/books.schema';
import { MockModel } from '../../../mongoose/tests/mock.model';

import { booksStub } from './book.stub';

export class BooksModel extends MockModel<Books> {
  protected entityStub = booksStub();
}
