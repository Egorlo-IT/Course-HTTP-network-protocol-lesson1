import * as http from "http";
import { readdirSync } from "fs";

const host = "localhost";
const port = process.env.PORT || 5000;
const path = "./files/";

const requestListener = (req, res) => {
  switch (req.url) {
    case "/get": {
      let list = "";
      try {
        readdirSync(path).forEach((file) => {
          list === "" ? (list += `${file}`) : (list += `, ${file}`);
        });
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(list);
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/html" });
        return res.end("Internal server error");
      }
    }
    case "/delete": {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end("success");
    }
    case "/post": {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end("success");
    }
    case "/redirect": {
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(
          "The resource is now permanently available at /redirected"
        );
      } else {
        res.writeHead(405, { "Content-Type": "text/html" });
        return res.end(
          `HTTP method "${req.method}" for ${req.url} not allowed`
        );
      }
    }
    default:
      res.writeHead(405, { "Content-Type": "text/html" });
      return res.end("HTTP method not allowed");
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
