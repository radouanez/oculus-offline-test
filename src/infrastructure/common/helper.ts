import { Application, NextFunction, Request, Response } from "express";

import { Route, Wrapper } from "./types";

class Helper {
  constructor() {}

  /**
   * @description make applying middlewares async before starting the app
   * @param fn
   */
  asyncMiddleware(fn: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  /**
   * @description handle applying all middelwares into the app
   * @param middlewares
   * @param app
   */
  applyMiddlewares(middlewares: Wrapper[], app: Application): void {
    for (const f of middlewares) {
      f(app);
    }
  }

  /**
   * @description handle applying routes in the app
   * @param routes
   * @param app
   */
  applyRoutes(routes: Route[], app: Application): void {
    routes.forEach((route: Route) => {
      const { method, path, handler } = route;
      (app as any)[method](path, this.asyncMiddleware(handler));
    });
  }
}

export default Helper;
