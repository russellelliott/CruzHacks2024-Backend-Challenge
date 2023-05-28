/*
#######################################################################
#
# Copyright (C) 2022-2023 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import supertest from 'supertest';
import * as http from 'http';

import app from '../app';
import * as login from './login';
import * as db from './db'; // import the database

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;
let accessToken: string|undefined;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  accessToken = await login.asAnna(request);
  await db.reset(); // reset database
});

afterAll((done) => {
  server.close(done);
  db.shutdown(); // reset server
});


// generate random number
// the field has a max length of 16,
// but that might be a bit excessive
// using 5 digits instead
// https://stackoverflow.com/questions/9120915/jquery-create-a-random-16-digit-number-possible
let ID = '';
let i;
for (i = 0; i < 5; i++) {
  const number = Math.floor(Math.random() * 10) % 10;
  ID += number;
}


/*const book = {
  id: ID,
  role: 'admin',
};*/

const book = {
  id: "", // The ID will be generated automatically on the server-side
  name: "John Doe",
  gender: "Male",
  other_gender: "",
  email: "johndoe@example.com",
  password: "password123",
  age: 25,
  application_type: "Judge",
  is_ucsc_student: true,
  other_school: "",
  current_company: "ABC Company",
};

let createdPersonId: string;

test('POST New', async () => {
  await request.post('/api/v0/person/')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(book)
    .expect(201)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.id).toBeDefined();
      expect(res.body.id).toEqual(book.id);

      // Store the ID in the variable
      createdPersonId = res.body.id;
    });
});

/*test('GET Created Person', async () => {
  // Use the createdPersonId variable in the request
  const response = await request.get(`/api/v0/person/${createdPersonId}`)
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200);

  // Perform assertions on the response
  expect(response).toBeDefined();
  expect(response.body).toBeDefined();
  expect(response.body.id).toEqual(createdPersonId);
  // Other assertions...
});*/


/*test('POST New', async () => {
  await request.post('/api/v0/person/')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(book)
    .expect(201)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.id).toBeDefined();
      expect(res.body.id).toEqual(book.id);
      //expect(res.body.role).toEqual(book.role);
    });
});

test('GET After POST', async () => {
  await request.get('/api/v0/person/' + book.id)
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.id).toBeDefined();
      expect(res.body.id).toEqual(book.id);
      //expect(res.body.lock).toEqual(book.role);
      // i called it "lock" when getting it;
      // i think "role" is a keyword
    });
});*/

/*test('POST Invalid ISBN', async () => {
  book.isbn = 'some-old-guff';
  await request.post('/api/v0/book/')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(book)
    .expect(400);
});*/

test('POST Exisiting ISBN', async () => {
  book.id = '86cbd2ec-ccbb-4eb3-aa99-2e8415f9d302';
  await request.post('/api/v0/person/')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(book)
    .expect(409);
});

test('POST Exisiting Email', async () => {
  book.id = 'anna@books.com';
  await request.post('/api/v0/person/')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(book)
    .expect(409);
});

/*test('POST Bad Request', async () => {
  book.isbn = 'AAAAAAAA';
  await request.post('/api/v0/book/')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(book)
    .expect(400);
});*/

test('POST Anauthorised', async () => {
  accessToken = await login.asMolly(request);
  await request.post('/api/v0/person/')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(book)
    .expect(401)
});