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

test('PATCH Update', async () => {
    let email = "nobby@books.com"
  const updatedPerson = {
    name: "Jane Smith",
    age: 30,
    current_company: "XYZ Company",
  };

  await request.patch(`/api/v0/person/?email=${email}`)
    .set('Authorization', 'Bearer ' + accessToken)
    .send(updatedPerson)
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.id).toBeDefined();
      //expect(res.body.id).toEqual(createdPersonId);
      expect(res.body.name).toEqual(updatedPerson.name);
      expect(res.body.age).toEqual(updatedPerson.age.toString());
      expect(res.body.current_company).toEqual(updatedPerson.current_company);
    });
});