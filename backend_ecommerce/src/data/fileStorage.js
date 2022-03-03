import fs from "fs/promises";

//fix __dirname for modules
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FileStorage {
  constructor(path) {
    this.filePath = __dirname + "/" + path;
  }

  async loadFile() {
    try {
      const data = await fs.readFile(this.filePath);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveFile(content) {
    try {
      const data = await fs.writeFile(this.filePath, JSON.stringify(content));
      return true;
    } catch (error) {
      console.log(
        "Error saving file, please check write access to the containing folder"
      );
    }
  }
}

export { FileStorage };
