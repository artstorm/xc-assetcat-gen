/**
 * Creates level tiles as ImageSets by cropping a large level artwork.
 */
const log = require("../Log");
const sharp = require("sharp");
const Config = require("../Config");
const { LogLevel } = require("../Enums");
const ContentsFile = require("../ContentsFile");
const Checksum = require("../Checksum");
const TargetFolder = require("../TargetFolder");
const ImageSet = require("../Types/ImageSet");

class Level {
  constructor(input) {
    this.input = input;

    log(`${this.input.name}:`);

    // Determine if source file has changed since last build.
    // We just check the first frame, and if that one is unchanged we assume
    // the entire spriteatlas is unchanged.
    const checksum = new Checksum(this.input.source);
    if (!checksum.isChanged()) {
      log("Source file unchanged. Skipping.", LogLevel.skip);
      return;
    }

    // Prepare properties.
    const folder = `${input.name}`;
    const path = `${this.input.target}/${folder}`;

    // Create target folder if required.
    const targetFolder = new TargetFolder(path).create();
    // Empty it from old versions of the image assets.
    targetFolder.empty();

    // Make a ContentsFile object.
    this.contentsFile = new ContentsFile(this.input.target, this.folder);
    this.contentsFile.write();

    const image = sharp(Config.sourceImagesRoot + this.input.source);
    const tileHeight = 1080;
    image.metadata().then((metadata) => {
      // Determine how many tiles to generate.
      const tiles = metadata.height / tileHeight; // Add a check so the level has the correct height!
      if (Number.isInteger(tiles) == false) {
        throw new Error(
          `Level source must be of a height dividable by ${tileHeight}.`
        );
      }
      for (let i = 1; i <= tiles; i++) {
        image
          .extract({
            left: 0,
            top: metadata.height - tileHeight * i,
            width: metadata.width,
            height: tileHeight,
          })
          .toFile("level1_" + i + ".jpg", (err, info) => {
            console.log(err);
          });
      }

      console.log(tiles);
    });
  }
}

module.exports = Level;
