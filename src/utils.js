import { parseArgs } from "node:util";

let commandlist = [
  "up",
  "cd",
  "ls",
  "cat",
  "add",
  "rn",
  "cp",
  "mv",
  "rm",
  "os",
  "hash",
  "compress",
  "decompress",
  ".exit",
];

function completer(line) {
  const hits = commandlist.filter((c) => c.startsWith(line));
  return [hits.length ? hits : commandlist, line];
}

function getUserName() {
  const args = process.argv.slice(2);
  const options = { username: { type: "string" } };
  const parsedArgs = parseArgs({ args, options });
  return parsedArgs.values.username ?? "<Undefined user>";
}

export { completer, getUserName };
