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
  accessToken = await login.asMolly(request);
  await db.reset(); // reset database
});

afterAll((done) => {
  server.close(done);
  db.shutdown(); // reset server
});

test('GET Invalid URL', async () => {
  await request.get('/api/v0/bookie-wookie')
    .expect(404);
});

test('GET API Docs', async () => {
  await request.get('/api/v0/docs/')
    .expect(200);
});

test('GET All', async () => {
  await request.get('/api/v0/person')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

test('GET One', async () => {
  await request.get('/api/v0/person/user1')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

test('GET One (query parameter)', async () => {
  await request.get('/api/v0/person?id=user1')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

test('GET Missing', async () => {
  await request.get('/api/v0/person/404')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(404);
});

test('GET Unauthorised', async () => {
  accessToken = await login.asNobby(request);
  await request.get('/api/v0/person')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(401);
});