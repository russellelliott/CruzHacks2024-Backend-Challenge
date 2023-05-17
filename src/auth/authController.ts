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

import {
  Body,
  Controller,
  Post,
  Response,
  Route,
} from 'tsoa';

import {Credentials, User} from './auth';
import {AuthService} from './authService';

@Route('login')
export class AuthController extends Controller {
  @Post()
  @Response('401', 'Unauthorised')
  public async login(
    @Body() credentials: Credentials,
  ): Promise<User|undefined> {
    return new AuthService().login(credentials)
      .then(async (user: User|undefined): Promise<User|undefined> => {
        if (!user) {
          this.setStatus(401);
        }
        return user;
      });
  }
}