function up(reader) {
  process.chdir("..");
  reader.setPrompt(`You are currently in ${process.cwd()}> `);
}

function cd(cmd, reader) {
  try {
    const pathTo = cmd.replace(/^cd/, "").trim();
    if (pathTo) {
      process.chdir(pathTo);
    } else {
      console.log("Invalid input");
    }
    reader.setPrompt(`You are currently in ${process.cwd()}> `);
  } catch (error) {
    console.log(error.message);
    console.log("Operation failed");
  }
}

export { up, cd };
