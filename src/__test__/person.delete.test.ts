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
});

test('DELETE After POST', async () => {
  await request.delete('/api/v0/person/' + book.id)
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(201);
});*/

const book = {
  id: "", // The ID will be generated automatically on the server-side
  name: "Harvey Hacker",
  gender: "Male",
  other_gender: "",
  email: "harvey@hacker.com",
  password: "ucanthackme",
  age: 25,
  application_type: "Hacker",
  is_ucsc_student: true,
  other_school: "",
  current_company: "ABC Company",
};

let createdPersonId: string; // Declare the variable outside the test block

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

      createdPersonId = res.body.id; // Assign the ID value to the variable
    });
});

test('DELETE Person', async () => {
  await request.delete(`/api/v0/person/${createdPersonId}`)
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(201);
});

test('DELETE 404', async () => {
  await request.delete('/api/v0/person/' + 'faker')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(404);
});

test('Unauthorized Delete', async () => {
  accessToken = await login.asNobby(request);
  await request.get('/api/v0/person')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(401);
});