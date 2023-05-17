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

import dotenv from 'dotenv';
dotenv.config();

import express, { 
    Express, 
    Router,
    Response as ExResponse, 
    Request as ExRequest, 
    ErrorRequestHandler 
  } from 'express';
  import cors from 'cors';
  import swaggerUi from 'swagger-ui-express';
  
  import { RegisterRoutes } from "../build/routes";
  
  const app: Express = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  
  app.use('/api/v0/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import('../build/swagger.json'))
    );
  });
  
  const router = Router();
  RegisterRoutes(router);
  app.use('/api/v0', router);
  
  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
      status: err.status,
    });
  };
  app.use(errorHandler);
  
  export default app;
  