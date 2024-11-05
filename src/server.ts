import { Server } from "http";
import app from "./app";

const port = 3000;

let server: Server;

async function main() {
  server = app.listen(port, () => {
    console.log("Server is running on port :", port);
  });
}

main();
