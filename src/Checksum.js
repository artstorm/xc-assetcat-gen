const fs = require("fs");
const crypto = require("crypto");
const Config = require("./Config");

class Checksum {
  constructor(file) {
    this.file = file;
    this.dbFile = "./ChecksumDB.json";

    // Get checksum for source file on disk.
    this.checksum = this.checksumForFile();

    // Load the checksum DB.
    this.loadDB();
  }

  /**
   * Loads checksum DB from disk.
   *
   * @return {Void}
   */
  loadDB() {
    // In dev, set empty to always build.
    if (process.env.npm_lifecycle_event == "dev") {
      this.db = {};
      return;
    }

    try {
      const db = fs.readFileSync(this.dbFile);
      this.db = JSON.parse(db);
    } catch (err) {
      this.db = {};
    }
  }

  /**
   * Update DB with file checksum and save to disk.
   *
   * @return {Void}
   */
  updateDB() {
    // In dev, don't update DB.
    if (process.env.npm_lifecycle_event == "dev") {
      return;
    }

    this.db[this.file] = this.checksum;

    this.saveDB();
  }

  /**
   * Save current DB state to disk.
   *
   * @return {Void}
   */
  saveDB() {
    fs.writeFileSync(this.dbFile, JSON.stringify(this.db, null, 2));
  }

  /**
   * Determine if source file has changed compared to DB entry.
   *
   * @return {Bool}
   */
  isChanged() {
    // Get checksum from DB.
    const dbChecksum = this.db[this.file];

    return dbChecksum != this.checksum;
  }

  /**
   * Get checksum for source file on disk.
   *
   * @return {String}
   */
  checksumForFile() {
    const file = fs.readFileSync(Config.sourceImagesRoot + this.file);

    return this.generateChecksum(file);
  }

  /**
   * Generate a checksum for passed in data.
   *
   * @param {String} str
   * @param {String} algorithm
   * @param {String} encoding
   *
   * @return {String}
   */
  generateChecksum(str, algorithm, encoding) {
    return crypto
      .createHash(algorithm || "md5")
      .update(str, "utf8")
      .digest(encoding || "hex");
  }
}

module.exports = Checksum;
