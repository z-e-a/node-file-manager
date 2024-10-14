import { existsSync, ReadStream, WriteStream } from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream";

function cat(cmd, reader) {
  try {
    const filePath = cmd.replace(/^cat/, "").trim();
    if (filePath) {
      const stream = new ReadStream(filePath);
      stream.on("readable", function () {
        const data = stream.read();
        if (data != null) {
          console.log("\n", data.toString());
        }
        reader.prompt(true);
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

function add(cmd, reader) {
  try {
    const filePath = cmd.replace(/^add/, "").trim();
    if (filePath) {
      if (existsSync(filePath)) {
        throw new Error("File already exists!");
      } else {
        fsp.writeFile(filePath, "", "utf8", (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      }
    } else {
      console.log("Invalid input");
    }
  } catch (error) {
    console.log(error.message);
    console.log("Operation failed");
    reader.prompt(true);
  }
}

async function rn(cmd, reader) {
  try {
    cmd = cmd.replace(/^rn/, "").trim();
    const sourceFilePath = cmd.split(" ")[0];
    const destFilePath = cmd.split(" ")[1];
    if (sourceFilePath && destFilePath) {
      await fsp.rename(sourceFilePath, destFilePath);
    } else {
      console.log("Invalid input");
    }
  } catch (error) {
    console.log(error.message);
    console.log("Operation failed");
    reader.prompt(true);
  }
}

async function cp(cmd, reader) {
  try {
    cmd = cmd.replace(/^cp/, "").trim();
    const sourceFilePath = cmd.split(" ")[0];
    const destFilePath = cmd.split(" ")[1];
    if (sourceFilePath && destFilePath) {
      await fsp.cp(sourceFilePath, destFilePath);
    } else {
      console.log("Invalid input");
    }
  } catch (error) {
    console.log(error.message);
    console.log("Operation failed");
    reader.prompt(true);
  }
}

async function mv(cmd, reader) {
  try {
    cmd = cmd.replace(/^mv/, "").trim();
    const sourceFilePath = cmd.split(" ")[0];
    const destFilePath = cmd.split(" ")[1];

    if (sourceFilePath && destFilePath) {
      if (!existsSync(sourceFilePath)) {
        const err = new Error();
        err.message = `ENOENT: no such file or directory, open '${path.resolve(
          sourceFilePath
        )}'`;
        err.code = "ENOENT";
        err.errno = -4058;
        err.path = path.resolve(sourceFilePath);
        throw err;
      }

      if (existsSync(destFilePath)) {
        throw new Error("Destination file already exists!");
      }

      const readStream = new ReadStream(sourceFilePath);
      const writeStream = new WriteStream(destFilePath);
      await pipeline(readStream, writeStream, (err) => {
        if (err) {
          console.log(err.message);
          console.log("Operation failed");
          reader.prompt(true);
        }
      });
      await fsp.rm(sourceFilePath);
    } else {
      console.log("Invalid input");
    }
  } catch (error) {
    console.log(error.message);
    console.log("Operation failed");
    reader.prompt(true);
  }
}

async function rm(cmd, reader) {
  try {
    const filePath = cmd.replace(/^rm/, "").trim();
    if (filePath) {
      await fsp.rm(filePath);
    } else {
      console.log("Invalid input");
    }
  } catch (error) {
    console.log(error.message);
    console.log("Operation failed");
    reader.prompt(true);
  }
}

export { cat, add, rn, cp, mv, rm };
