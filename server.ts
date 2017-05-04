// simple express server

import * as express from "express";
import * as path from "path";

let app;
let server;
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 8081;
const root = path.resolve(__dirname);

app = express();
app.use((req, res, next) => { console.info(req.url); next(); });
app.use(express.static(root + "/public"));
server = app.listen(port, host, serverStarted);

function serverStarted() {
  console.info("Server started", `${host}:${port}`);
  console.info("Root directory", root);
  console.info("Press Ctrl+C to exit...\n");
}
