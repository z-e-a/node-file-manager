import { existsSync, ReadStream, WriteStream } from "node:fs";
import { pipeline } from "node:stream";
import zlib from "zlib";

async function compress(cmd, reader) {
  try {
    cmd = cmd.replace(/^compress/, "").trim();

    const sourceFilePath = cmd.split(" ")[0];
    const destFilePath = cmd.split(" ")[1];
    if (sourceFilePath && destFilePath) {
      const readStream = new ReadStream(sourceFilePath);
      const writeStream = new WriteStream(destFilePath);

      await pipeline(readStream, zlib.createGzip(), writeStream, (err) => {
        if (err) {
          console.log(err.message);
          console.log("Operation failed");
          reader.prompt(true);
        }
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

async function decompress(cmd, reader) {
  try {
    cmd = cmd.replace(/^decompress/, "").trim();

    const sourceFilePath = cmd.split(" ")[0];
    const destFilePath = cmd.split(" ")[1];
    if (sourceFilePath && destFilePath) {
      const readStream = new ReadStream(sourceFilePath);
      const writeStream = new WriteStream(destFilePath);

      await pipeline(readStream, zlib.createUnzip(), writeStream, (err) => {
        if (err) {
          console.log(err.message);
          console.log("Operation failed");
          reader.prompt(true);
        }
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
export { compress, decompress };
