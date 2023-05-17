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

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import {Credentials, User} from './auth';

import secrets from '../../data/secrets.json';
import users from '../../data/users.json';

// User information; name, password, roles, name
/*type UserInfo = {
  email: string
  scopes: string[]
  iat: number
  exp: number
};*/

/*type UserInfo = {
  name: string,
  accessToken: string,
  scopes?: string[]
}*/

/*const UserInfo = {
  email: "",
  scopes: [],
  iat: 0,
  exp: 0
};

type UserType = typeof UserInfo*/

export class AuthService {
  public async login(credentials: Credentials): Promise<User|undefined>  {
    const user = users.find((user) => { 
      return user.email === credentials.email && 
        bcrypt.compareSync(credentials.password, user.password);
    });
    if (user) {
      const accessToken = jwt.sign(
        {email: user.email, scopes: user.roles}, 
        secrets.accessToken, {
          expiresIn: '30m',
          algorithm: 'HS256'
        });
      return {name: user.name, accessToken: accessToken};
    } else {
      return undefined;
    }
  }

  public async check(authHeader?: string, scopes?: string[]): Promise<User>  {
    return new Promise((resolve, reject) => {
      if (!authHeader) {
        reject(new Error("Unauthorised"));
      }
      else {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secrets.accessToken, (err, decoded) => {
          const user = decoded as User;
          //user = user as User;
          // console.log(user);
          // console.log(typeof user.iat);
          //console.log(typeof user);
          // const user = jwt.decode(token, { json: true }) as UserInfo;
          //const userScopes = jwt.decode(token) as UserInfo;
          //console.log(userScopes); //make sure this has scopes
          if (err) {
            reject(err);
          } else if (scopes){
            for (const scope of scopes) {
              if (!user.scopes || !user.scopes.includes(scope)) {
                reject(new Error("Unauthorised"));
              }
            }
          }
          //user = user as User; //cast as user type for return
          resolve(user);
        });
      }
    });
  }
}