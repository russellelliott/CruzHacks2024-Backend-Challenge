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

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll((done) => {
  server.close(done);
});

const bad = {
  email: 'molly@books.com',
  password: 'notmollyspassword',
};

test('OK', async () => {
  await request.post('/api/v0/login')
    .send(login.molly)
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.name).toBeDefined();
      expect(res.body.name).toEqual('Molly Member');
      expect(res.body.accessToken).toBeDefined();
    });
});

test('Bad Credentials', async () => {
  await request.post('/api/v0/login')
    .send(bad)
    .expect(401);
});

//person
test('Corrupt JWT (Molly)', async () => {
  const accessToken = await login.asMolly(request);
  await request.get('/api/v0/person')
    .set('Authorization', 'Bearer ' + accessToken + 'garbage')
    .expect(401);
});

test('Corrupt JWT (Anna)', async () => {
  const accessToken = await login.asAnna(request);
  await request.get('/api/v0/person')
    .set('Authorization', 'Bearer ' + accessToken + 'garbage')
    .expect(401);
});

test('No roles', async () => {
  const accessToken = await login.asNobby(request);
  await request.get('/api/v0/person')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(401)
});

test('No auth header', async () => {
  await request.get('/api/v0/person')
    .expect(401)
});