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
// import {Credentials} from "../auth/auth"
// import {User} from "../auth/auth"

import supertest from 'supertest';

// New custom interface to represent user credentials
const Credentials = {
  email: "string",
  password: "string"
}

type Credit = typeof Credentials;

export const molly = {
  email: 'molly@books.com',
  password: 'mollymember',
};

/*export const molly: Credit = Object.assign({}, Credentials, 
    {
      email: 'molly@books.com',
      password: 'mollymember',
    }
);*/


export const anna = {
  email: 'anna@books.com',
  password: 'annaadmin',
};

/*export const anna: Credit = Object.assign({}, Credentials, 
  {
    email: 'anna@books.com',
    password: 'annaadmin',
  }
);*/

export const nobby = {
  email: 'nobby@books.com',
  password: 'nobbynobody',
};

/*export const nobby: Credit = Object.assign({}, Credentials, 
  {
    email: 'nobby@books.com',
    password: 'nobbynobody',
  }
);*/

export async function login(request: supertest.SuperTest<supertest.Test>, member: Credit): Promise<string|undefined> {
  let accessToken;
  await request.post('/api/v0/login')
    .send(member)
    .expect(200)
    .then((res) => {
      //console.log(res);
      accessToken = res.body.accessToken;
    });
  return accessToken;
}

export async function asMolly(request: supertest.SuperTest<supertest.Test>): Promise<string|undefined> {
  return login(request, molly);
}

export async function asAnna(request: supertest.SuperTest<supertest.Test>): Promise<string|undefined> {
  return login(request, anna);
}

export async function asNobby(request: supertest.SuperTest<supertest.Test>): Promise<string|undefined> {
  return login(request, nobby);
}