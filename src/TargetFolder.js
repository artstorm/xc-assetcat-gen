/**
 * Creates targets folders in the asset catalog.
 *
 * If required, `Group` folders are recursively generated to build the hierarchy
 * to the target folder.
 */
const fs = require("fs");
const path = require("path");
const Config = require("./Config");

class TargetFolder {
  /**
   * @param {String} path Relative path to the folder.
   */
  constructor(path) {
    // Strip pre and post slashes so we have a predictable path string.
    this.path = this.stripSlashes(path);
  }

  /**
   * Recursively create the target folder.
   *
   * @return {this}
   */
  create() {
    // Require it here, because `Group` and `TargetFolder`` can't require each
    // other on the module level.
    const Group = require("./Types/Group");

    // Prepare properties.
    const segments = this.path.split("/");
    const root = Config.assetCatalogRoot;
    let path = "";

    segments.forEach((segment, index) => {
      // Add next segment to the path.
      path += `/${segment}`;

      // Check if folder exists.
      if (!fs.existsSync(`${root}${path}`)) {
        // It didn't exist...
        if (index == segments.length - 1) {
          // ... and it's the last segment, create folder on disk.
          const t = fs.mkdirSync(`${root}${path}`);
        } else {
          // ... else, not the last segment, create a group on disk.
          const group = new Group(path);
        }
      } else {
        // Folder already exists, nothing to do...
      }
    });

    return this;
  }

  /**
   * Empties the target folder.
   *
   * @return {Void}
   */
  empty() {
    const files = fs.readdirSync(this.fullPath);

    for (const file of files) {
      const filePath = path.join(this.fullPath, file);

      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      } else {
        fs.rmdirSync(filePath, { recursive: true });
      }
    }
  }

  /**
   * Strip the string for leading or trailing slashes.
   *
   * @param {String} string
   * @return {String}
   */
  stripSlashes(string) {
    // Remove leading slashes.
    string = string.replace(/^\/+/g, "");

    // Remove trailing slashes.
    string = string.replace(/\/+$/, "");

    return string;
  }

  /**
   * Get full path to the target folder.
   *
   * @return {String}
   */
  get fullPath() {
    return `${Config.assetCatalogRoot}/${this.path}`;
  }
}

module.exports = TargetFolder;
