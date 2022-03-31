import { RepoError } from "../commons/errors.js";

class RepositoryFactory {
  constructor() {}

  static async getRepository(object, type) {
    if (
      ["sqlite", "mongodb", "file", "firebase"].includes(type) &&
      ["Cart", "Product"].includes(object)
    ) {
      let { repository } = await import(
        `./${type}/${type}${object}Repository.js`
      );
      return new repository();
    } else {
      throw new RepoError(-11, "Concrete repository not found");
    }
  }
}

export { RepositoryFactory };
