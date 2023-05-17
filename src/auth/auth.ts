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

export interface Credentials {
  email: string,
  password: string
}

//added scopes to allievate erros. add ? to account for undefined
export interface User {
  name: string,
  accessToken: string,
  scopes?: string[]
}