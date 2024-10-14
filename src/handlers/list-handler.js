import fsp from "node:fs/promises";

function list(reader) {
  try {
    fsp.readdir(process.cwd(), { withFileTypes: true }).then((files) => {
      console.log();
      console.table(
        files
          .map((dirent) => {
            return {
              Name: dirent.name,
              Type: dirent.isFile() ? "file" : "directory",
            };
          })
          .sort((dirent1, dirent2) => {
            let res = 0;
            if (dirent1.Type === "directory") {
              if (dirent2.Type === "directory") {
                return String(dirent1.name).localeCompare(dirent2.name);
              } else {
                res = -1;
              }
            } else {
              if (dirent2.Type === "directory") {
                return String(dirent1.name).localeCompare(dirent2.name);
              } else {
                res = 1;
              }
            }
            return res;
          })
      );
      console.log();
      reader.prompt(true);
    });
  } catch (error) {
    console.log(error.message);
    console.log("Operation failed");
  }
}

export { list };
