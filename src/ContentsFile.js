/**
 * Generate Contents.json.
 *
 * Contents.json files encode the attributes for elements represented by folders
 * in the hierarchy. Each folder can contain one Contents.json file that encodes
 * the attributes for the asset or group it contains.
 *
 * Apple Reference:
 * https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/Contents.html#//apple_ref/doc/uid/TP40015170-CH36-SW1
 */
const fs = require("fs");
const Config = require("./Config");

class ContentsFile {
  /**
   * @param {String} path Relative path to the folder to create Contents.json.
   */
  constructor(path) {
    this.path = path;
    this.contents = {};

    // Create default structure for contents object with the info key.
    this.contents.info = {
      author: Config.author,
      version: 1,
    };
  }

  /**
   * Add a new content to specified key.
   *
   * @param {String} key
   * @param {Object} content
   */
  add(key, content) {
    // Create the key if not already exists.
    if (!(key in this.contents)) {
      this.contents[key] = [];
    }

    // Push content to the key's array
    this.contents[key].push(content);
  }

  /**
   * Write the contents object to Contents.json to disk.
   */
  write() {
    const fullPath = `${Config.assetCatalogRoot}/${this.path}/Contents.json`;

    fs.writeFile(fullPath, JSON.stringify(this.contents, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      // File was created.
    });
  }
}

module.exports = ContentsFile;
