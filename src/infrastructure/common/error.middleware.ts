import { Application, NextFunction, Request, Response } from "express";

import { HTTP404Error, HTTPClientError } from "./http-errors";

//middleware to handle errors: httpClientErrors & httpServerErrors
const errorHandler = (app: Application) => {
  // handle404Error
  app.use((req: Request, res: Response) => {
    throw new HTTP404Error("Method not found.");
  });

  // handleClientError
  app.use(
    (err: HTTPClientError, req: Request, res: Response, next: NextFunction) => {
      // catch only client errors
      if (err.name === "ClientError") {
        console.error(err);
        let clientError = {
          name: "ClientError",
          statusCode: err.statusCode,
          message: err.message,
          code: err.code || "",
          error: process.env.NODE_ENV === "dev" ? err.stack : "Client Error",
        };

        res.status(err.statusCode).json(clientError);
      } else {
        next(err);
      }
    }
  );

  // handleServerError
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let serverError = {
      name: "ServerError",
      statusCode: 500,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "dev" ? err.stack : "Internal Server Error",
    };
    res.status(500).json(serverError);
  });
};

export default errorHandler