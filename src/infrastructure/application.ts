require("dotenv").config();

import express, { Express } from "express";

import Helper from "./common/helper";
import middlwares from "./common/middlewares";
import routes from "../adapters/api/notes.router";
import sequelize from "../adapters/datasource/sequelize.connector";
import errorHandler from "./common/error.middleware";

const helper: Helper = new Helper();
// create the app
const application: Express = express();

// configure common middlewares
helper.applyMiddlewares(middlwares, application);

// configure routes
helper.applyRoutes(routes, application);

// error handling
helper.applyMiddlewares([errorHandler], application);

// sync the db
sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

export default application;
