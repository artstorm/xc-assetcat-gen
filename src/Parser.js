/**
 * Parse array of assets.
 */
const { Type } = require("./Enums");

// Asset Catalog Types
const ImageSet = require("./Types/ImageSet");
const SpriteAtlas = require("./Types/SpriteAtlas");

// Extra Types - GameDev specific and converted to Asset Catalog Types.
const Level = require("./Extras/Level");
const Sequence = require("./Extras/Sequence");

class Parser {
  constructor(assets) {
    this.assets = assets;
  }

  parse() {
    this.assets.forEach((asset) => {
      switch (asset.type) {
        // Asset Catalog Types.
        case Type.ImageSet:
          new ImageSet(asset);
          break;
        case Type.SpriteAtlas:
          new SpriteAtlas(asset);
          break;

        // Extra Types
        case Type.Sequence:
          new Sequence(asset);
          break;
        case Type.Level:
          new Level(asset);
          break;
        default:
          throw new Error(`Type ${String(asset.type)} not implemented.`);
      }
    });
  }
}

module.exports = Parser;
