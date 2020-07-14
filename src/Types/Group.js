/**
 * Group Type.
 *
 * A group of named assets and other named groups, including nested groups.
 * ie. a basic folder.
 *
 * Apple Reference
 * https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/GroupType.html#//apple_ref/doc/uid/TP40015170-CH21-SW1
 */
const fs = require("fs");
const ContentsFile = require("../ContentsFile");
const TargetFolder = require("../TargetFolder");

class Group {
  /**
   * @param {String} path Relative path to the group.
   */
  constructor(path) {
    // Create the folder for the group.
    new TargetFolder(path).create();

    // Make a ContentsFile group object and write to folder.
    const contentsFile = new ContentsFile(path);
    contentsFile.write();
  }
}

module.exports = Group;
