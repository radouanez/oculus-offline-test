import { Application, NextFunction, Request, Response } from "express";

export type Route = {
  path: string;
  method: string;
  validator?: any;
  handler: Handler | Handler[];
};
export type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown | void> | void;

export type Wrapper = (app: Application) => unknown;
