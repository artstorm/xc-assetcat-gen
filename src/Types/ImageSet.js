/**
 * Image Set Type.
 *
 * Apple Reference:
 * https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/ImageSetType.html#//apple_ref/doc/uid/TP40015170-CH25-SW1
 */
const sharp = require("sharp");
const ContentsFile = require("../ContentsFile");
const Config = require("../Config");
const { Idiom, Scale, LogLevel } = require("../Enums");
const TargetFolder = require("../TargetFolder");
const Checksum = require("../Checksum");
const log = require("../Log");

class ImageSet {
  constructor(input) {
    this.input = input;

    log(`${this.input.name}:`);

    // Determine if source file has changed since last build.
    const checksum = new Checksum(this.input.source);
    if (!checksum.isChanged()) {
      log("Source file unchanged. Skipping.", LogLevel.skip);
      return;
    }

    // Prepare properties.
    const folder = `${input.name}.imageset`;
    const path = `${this.input.target}/${folder}`;

    // Create target folder if required.
    this.targetFolder = new TargetFolder(path).create();
    // Empty it from old versions of the image assets.
    this.targetFolder.empty();

    // Make a ContentsFile object.
    this.contentsFile = new ContentsFile(path);

    // Build the assets for each device.
    input.devices.forEach(
      function (device) {
        if (device == Idiom.iPad) {
          // We don't use 1x for iPad, so we just make an empty entry for it.
          this.addToContentsFile(null, Idiom.iPad, Scale["1x"]);

          const name = `${this.input.name}-iPad@2x.${this.input.format}`;
          // iPad 2x. 3*size (little too small for 12.9 but fit the other sizes well) (3.8 would get the 12.9)
          this.createResizedImage(
            name,
            this.input.size.width * 3,
            this.input.size.height * 3
          );
          this.addToContentsFile(name, Idiom.iPad, Scale["2x"]);
        }

        if (device == Idiom.iPhone) {
          // We don't use 1x for iPhone, so we just make an empty entry for it.
          this.addToContentsFile(null, Idiom.iPhone, Scale["1x"]);

          let name = `${this.input.name}-iPhone@2x.${this.input.format}`;
          // iPhone 2x. 1.5 * size
          this.createResizedImage(
            name,
            this.input.size.width * 1.5,
            this.input.size.height * 1.5
          );
          this.addToContentsFile(name, Idiom.iPhone, Scale["2x"]);

          name = `${this.input.name}-iPhone@3x.${this.input.format}`;
          // iPhone 3x. 2 * size (slightly too small for Max models) (2.3 would get the max models).
          this.createResizedImage(
            name,
            this.input.size.width * 2,
            this.input.size.height * 2
          );
          this.addToContentsFile(name, Idiom.iPhone, Scale["3x"]);
        }

        if (device == Idiom.mac) {
          // We treat the mac screen as a 1920x1080 native. So same multipliers as for TV.

          let name = `${this.input.name}-mac@1x.${this.input.format}`;
          this.createResizedImage(
            name,
            this.input.size.width * 2,
            this.input.size.height * 2
          );
          this.addToContentsFile(name, Idiom.mac, Scale["1x"]);

          name = `${this.input.name}-mac@2x.${this.input.format}`;
          this.createResizedImage(
            name,
            this.input.size.width * 4,
            this.input.size.height * 4
          );
          this.addToContentsFile(name, Idiom.mac, Scale["2x"]);
        }

        if (device == Idiom.tv) {
          // We make formats for HD and 4k.

          let name = `${this.input.name}-tv@1x.${this.input.format}`;
          this.createResizedImage(
            name,
            this.input.size.width * 2,
            this.input.size.height * 2
          );
          this.addToContentsFile(name, Idiom.tv, Scale["1x"]);

          name = `${this.input.name}-tv@2x.${this.input.format}`;
          this.createResizedImage(
            name,
            this.input.size.width * 4,
            this.input.size.height * 4
          );
          this.addToContentsFile(name, Idiom.tv, Scale["2x"]);
        }
      }.bind(this)
    );

    // Write the contents file.
    this.contentsFile.write();

    // Update checksum DB.
    checksum.updateDB();
  }

  createResizedImage(name, width, height) {
    // Round sizes to nearest integer.
    width = Math.round(width);
    height = Math.round(height);

    const image = sharp(Config.sourceImagesRoot + this.input.source);
    image
      .metadata()
      .then((metadata) => {
        if (width > metadata.width || height > metadata.height) {
          log("Source asset is not large enough", LogLevel.error);
        }

        return image;
      })
      .then((data) => {
        data
          .resize(width, height)
          .toFile(`${this.targetFolder.fullPath}/${name}`, (err, info) => {
            if (err) {
              log(err, LogLevel.error);
            }
          });
      });

    log(`Created "${name}"`, LogLevel.success);
  }

  addToContentsFile(name, idiom, scale) {
    let content = {
      idiom: idiom.description,
      scale: scale.description,
    };

    if (name != null) {
      content.filename = name;
    }

    this.contentsFile.add("images", content);
  }
}

module.exports = ImageSet;
