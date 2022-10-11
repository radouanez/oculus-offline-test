import http from "http";

import application from "./application";
import config from "./config";

// create the server
const server = http.createServer(application);

// get the port
const port: Number = config.server.port;

// set the port
application.set("port", port);

// start the server
server.listen(port);

// Event listener for HTTP server 'listening' event.
server.on("listening", () => {
  const addr: any = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
});

// Event listener for HTTP server 'error' event.
server.on("error", (error: any) => {
  // handle specific listening errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(port + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(port + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

process.on("uncaughtException", function (err: any) {
  if (err && err.code && err.code === "ERR_HTTP_HEADERS_SENT") {
    return;
  }
  process.exit(1);
});
