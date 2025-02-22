const fs = require("fs/promises");

(async () => {
  const createFile = async (path) => {
    try {
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();

      return console.log(`The file ${path} already exist`);
    } catch (err) {
      const newFileHandle = await fs.open(path, "w");
      console.log("file is successfully created");
      newFileHandle.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log(`Deleting ${path}`);
      console.log("The file is successfully removed");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("No file at this path to remove.");
      } else {
        console.log("An error occurred while removing the file: ");
        console.log(error);
      }
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log(`Rename ${(oldPath, newPath)}`);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          "No file at this path to rename, or the destination does not exist."
        );
      } else {
        console.log("An error occurred while renaming the file: ");
        console.log(error);
      }
    }
  };

  let addedContent;

  const addToFile = async (path, content) => {
    if (addedContent === content) return;
    try {
      await fs.appendFile(path, content);
      addedContent = content;
      console.log(`Adding to ${path}`);
      console.log(`Content: ${content}`);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          "No file at this path to add to, or the destination does not exist."
        );
      } else {
        console.log("An error occurred while adding to the file: ");
        console.log(error);
      }
    }
  };

  //commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    // get the size of the file
    const size = (await commandFileHandler.stat()).size;
    //allocate the buffer with the size of the file
    const buff = Buffer.alloc(size);
    // the location of which I want to start filling of the file
    const offset = 0;
    //how many bytes I want top read
    const length = buff.byteLength;
    // the position that i wat to start reading the file from
    const position = 0;

    await commandFileHandler.read(buff, offset, length, position);

    const command = buff.toString("utf-8");

    //create a file:
    //create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    //delete a file
    //delete a file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    //rename file
    //rename the file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldPath = command.substring(RENAME_FILE.length + 1, _idx);
      const newPath = command.substring(_idx + 4);

      renameFile(oldPath, newPath);
    }

    //add to file
    //add to the file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);

      addToFile(filePath, content);
    }
  });

  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
