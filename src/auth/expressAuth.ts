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

import {Request} from "express";
import {AuthService} from './authService';
import {User} from "./auth"

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<User> {
  return new AuthService().check(request.headers.authorization, scopes);
}