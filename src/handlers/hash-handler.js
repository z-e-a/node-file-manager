import os, { type } from "node:os";
import { parseArgs } from "node:util";
import { existsSync, ReadStream, WriteStream } from "node:fs";
import { createHash } from "node:crypto";

async function calcHash(cmd, reader) {
  try {
    const filePath = cmd.replace(/^hash/, "").trim();
    if (filePath) {
      const stream = new ReadStream(filePath);
      stream.on("readable", function () {
        const data = stream.read();
        if (data != null) {
          console.log(createHash("sha256").update(data).digest("hex"));
          reader.prompt(true);
        }
      });
      stream.on("error", (err) => {
        console.log(err.message);
        console.log("Operation failed");
        reader.prompt(true);
      });
    } else {
      console.log("Invalid input");
    }
  } catch (error) {
    console.log(error.message);
    console.log("Operation failed");
    reader.prompt(true);
  }
}

export { calcHash };
