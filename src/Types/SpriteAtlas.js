/**
 * Sprite Atlas Type.
 *
 * Image sets in this folder will be avaialble in a SKTextureAtlas.
 *
 * Apple Reference:
 * https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/SpriteAtlasType.html#//apple_ref/doc/uid/TP40015170-CH27-SW1
 */
const log = require("../Log");
const { LogLevel } = require("../Enums");
const ContentsFile = require("../ContentsFile");
const TargetFolder = require("../TargetFolder");

class SpriteAtlas {
  constructor(input) {
    this.input = input;

    log(`${this.input.name}:`);

    // Prepare properties.
    const folder = `${input.name}.spriteatlas`;
    const path = `${this.input.target}/${folder}`;

    // Create target folder if required.
    new TargetFolder(path).create();

    // Make a ContentsFile group object and write to folder.
    const contentsFile = new ContentsFile(path);
    contentsFile.write();

    // Update target path in the assets to the Sprite Atlas.
    const assets = input.assets.map((asset) => {
      asset.target = path;
      return asset;
    });

    // Parse the assets in the Sprite Atlas.
    const Parser = require("../Parser"); // Prevents cross require Parser/SpriteAtlas.
    const parser = new Parser(assets);
    parser.parse();

    // Make a ContentsFile object.
    this.contentsFile = new ContentsFile(this.input.target, this.folder);
    this.contentsFile.write();
  }
}

module.exports = SpriteAtlas;
