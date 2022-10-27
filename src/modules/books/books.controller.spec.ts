// import { Test } from '@nestjs/testing';
// import { BooksController } from './books.controller';
// import { BooksRepository } from './books.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { BookDocument } from 'src/mongoose/schemas/books.schema';
// import { Model } from 'mongoose';

// describe('BooksController', () => {
//   let bookController: BooksController;
//   let bookService: BooksRepository;
//   let mockBookModel: Model<BookDocument>;
//   beforeEach(async () => {
//     function mockBookModelF(dto: any) {
//       this.data = dto;
//       this.save = () => {
//         return this.data;
//       };
//     }
//     const moduleRef = await Test.createTestingModule({
//       controllers: [BooksController],
//       providers: [
//         BooksRepository,
//         {
//           provide: getModelToken('Books'),
//           useValue: {
//             _id: '629f6033c26de1340d85d460',
//             title: 'Title',
//             description: 'Description',
//             authors: 'Authors',
//             favorite: 'Favorite',
//             fileCover: 'FileCover',
//             fileName: 'FileName',
//             __v: 0,
//           },
//         },
//       ],
//     }).compile();

//     bookService = await moduleRef.resolve(BooksRepository);
//     bookController = new BooksController(bookService);
//     // mockBookModel = moduleRef.get<Model<BookDocument>>(getModelToken('Books'));
//     // console.log('mockBookModel', mockBookModel);
//   });
//   describe('findAll', () => {
//     it('should return an array of book', async () => {
//       let result: Promise<BookDocument[]>;
//       jest.spyOn(bookService, 'getBooks').mockImplementation(() => {
//         return result;
//       });
//       console.log(
//         'bookController.getBooks()',
//         await bookController.getBooks(),
//         result,
//       );
//       expect(await bookController.getBooks()).toBe(result);
//     });
//   });
// });
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { Books } from '../../mongoose/schemas/books.schema';
import { BooksRepository } from './books.repository';
import { booksStub } from './stubs/book.stub';
import { BooksModel } from './stubs/book.model';

describe('BooksRepository', () => {
  let booksRepository: BooksRepository;

  describe('find operations', () => {
    let booksModel: BooksModel;
    let booksFilterQuery: FilterQuery<Books>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          BooksRepository,
          {
            provide: getModelToken(Books.name),
            useClass: BooksModel,
          },
        ],
      }).compile();

      booksRepository = moduleRef.get<BooksRepository>(BooksRepository);
      booksModel = moduleRef.get<BooksModel>(getModelToken(Books.name));

      booksFilterQuery = {
        id: booksStub().id,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let books: Books;

        beforeEach(async () => {
          jest.spyOn(booksModel, 'findOne');
          books = await booksRepository.findOne(booksFilterQuery);
        });

        test('then it should call the booksModel', () => {
          expect(booksModel.findOne).toHaveBeenCalledWith(booksFilterQuery, {
            _id: 0,
            __v: 0,
          });
        });

        test('then it should return a books', () => {
          expect(books).toEqual(booksStub());
        });
      });
    });

    describe('findAll', () => {
      describe('when find is called', () => {
        let books: Books[];

        beforeEach(async () => {
          jest.spyOn(booksModel, 'find');
          books = await booksRepository.find(booksFilterQuery);
        });

        test('then it should call the booksModel', () => {
          expect(booksModel.find).toHaveBeenCalledWith(booksFilterQuery);
        });

        test('then it should return a books', () => {
          expect(books).toEqual([booksStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let books: Books;

        beforeEach(async () => {
          jest.spyOn(booksModel, 'findOneAndUpdate');
          books = await booksRepository.findOneAndUpdate(
            booksFilterQuery,
            booksStub(),
          );
        });

        test('then it should call the booksModel', () => {
          expect(booksModel.findOneAndUpdate).toHaveBeenCalledWith(
            booksFilterQuery,
            booksStub(),
            { new: true },
          );
        });

        test('then it should return a books', () => {
          expect(books).toEqual(booksStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          BooksRepository,
          {
            provide: getModelToken(Books.name),
            useValue: BooksModel,
          },
        ],
      }).compile();

      booksRepository = moduleRef.get<BooksRepository>(BooksRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let books: Books;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(BooksModel.prototype, 'save');
          constructorSpy = jest.spyOn(BooksModel.prototype, 'constructorSpy');
          books = await booksRepository.create(booksStub());
        });

        test('then it should call the booksModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(booksStub());
        });

        test('then it should return a books', () => {
          expect(books).toEqual(booksStub());
        });
      });
    });
  });
});
