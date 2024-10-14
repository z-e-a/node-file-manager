import os, { type } from "node:os";
import { parseArgs } from "node:util";

async function osInfo(cmd, reader) {
  try {
    const args = cmd.replace(/^os/, "").trim().split(" ");

    if (args.length && args[0]) {
      const options = {
        EOL: { type: "boolean" },
        cpus: { type: "boolean" },
        homedir: { type: "boolean" },
        username: { type: "boolean" },
        architecture: { type: "boolean" },
      };
      const parsedArgs = parseArgs({
        args,
        options,
      });

      if (parsedArgs.values.EOL) {
        console.log(
          `The operating system-specific end-of-line marker is: ${JSON.stringify(
            os.EOL
          )}`
        );
      }
      if (parsedArgs.values.homedir) {
        console.log(
          `The string path of the current user's home directory is: ${
            os.userInfo().homedir
          }`
        );
      }
      if (parsedArgs.values.username) {
        console.log(
          `The currently effective user is: ${os.userInfo().username}`
        );
      }
      if (parsedArgs.values.architecture) {
        console.log(`The operating system CPU architecture is: ${os.arch()}`);
      }

      if (parsedArgs.values.cpus) {
        const cpus = os.cpus();
        console.log(`Total CPUs: ${cpus.length}`);

        console.table(
          cpus.map((cpu) => ({
            Model: cpu.model,
            Frequency: `${cpu.speed / 1000} GHz`,
          }))
        );
      }
    } else {
      console.log("Mandatory arguments are not provided!");
      console.log("Invalid input");
    }
  } catch (error) {
    console.log(error.message);
    console.log("Operation failed");
    reader.prompt(true);
  }
}

export { osInfo };
