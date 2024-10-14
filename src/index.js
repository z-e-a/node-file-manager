import * as readline from "node:readline/promises";
import os from "node:os";

import { up, cd } from "./handlers/dir-handler.js";
import { list } from "./handlers/list-handler.js";
import { add, cat, cp, mv, rm, rn } from "./handlers/file-handler.js";
import { osInfo } from "./handlers/os-handler.js";
import { calcHash } from "./handlers/hash-handler.js";
import { compress, decompress } from "./handlers/zip-handler.js";
import { completer, getUserName } from "./utils.js";

process.chdir(os.homedir());

const userName = getUserName();

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `You are currently in ${process.cwd()}> `,
  completer: completer,
});

console.log(`Welcome to the File Manager, ${userName}!`);
reader.prompt(true);

reader.on("close", () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit();
});

reader.on("line", async (line) => {
  try {
    if (line === ".exit") {
      reader.close();
    } else if (line.trim() === "up") {
      up(reader);
    } else if (line.startsWith("cd")) {
      cd(line, reader);
    } else if (line.startsWith("cat")) {
      cat(line, reader);
    } else if (line.startsWith("add")) {
      add(line, reader);
    } else if (line.startsWith("rn")) {
      rn(line, reader);
    } else if (line.startsWith("cp")) {
      cp(line, reader);
    } else if (line.startsWith("mv")) {
      mv(line, reader);
    } else if (line.startsWith("rm")) {
      rm(line, reader);
    } else if (line.startsWith("os")) {
      osInfo(line, reader);
    } else if (line.trim() === "ls") {
      list(reader);
    } else if (line.startsWith("hash")) {
      calcHash(line, reader);
    } else if (line.startsWith("compress")) {
      compress(line, reader);
    } else if (line.startsWith("decompress")) {
      decompress(line, reader);
    } else {
      console.log("Invalid input");
    }
  } catch (error) {
    console.log(error.message);
    console.log("Operation failed");
  }
  reader.prompt(true);
});
