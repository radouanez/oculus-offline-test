import cors from "cors";
import compression from "compression";
import { Application } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

import checkAuth from "./auth.middleware";
import swaggerDocument from '../../swagger.json';

const handleCors = (app: Application) =>
  app.use(cors({ credentials: true, origin: true }));

const handleCompression = (app: Application) => {
  app.use(compression());
};

const handleHelmet = (app: Application) => {
  app.use(helmet());
};

const handleBodyParsing = (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

// documentation of the APIs
export const handleDocs = (app: Application) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
};

export default [checkAuth, handleCors, handleCompression, handleHelmet, handleBodyParsing, handleDocs];
