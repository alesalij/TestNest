// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BooksModule } from '../src/modules/books/books.module';
import { AppModule } from '../src/app.module';

import { INestApplication } from '@nestjs/common';
import { BooksService } from '../src/modules/books/books.service';
import { Connection } from 'mongoose';
import { DatabaseService } from '../src/mongoose/database.service';
import { booksStub } from '../src/modules/books/stubs/book.stub';
describe('Books', () => {
  let app: INestApplication;
  let httpServer: any;

  let dbConnection: Connection;

  const booksService = { findAll: () => ['test'] };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(BooksService)
      // .useValue(booksService)
      .compile();
    app = moduleRef.createNestApplication();
    httpServer = app.getHttpServer();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });
  it(`/ GET books`, async () => {
    await dbConnection.collection('books').insertOne(booksStub());
    const response = await request(httpServer).get('/books');

    expect(response.status).toBe(200);
    // await request(httpServer).get('/books').expect(200);
  });
  afterAll(async () => {
    await app.close();
  });
});
