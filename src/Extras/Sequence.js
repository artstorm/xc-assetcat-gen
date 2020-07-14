/**
 * Creates ImageSets from a numbered sequence of images.
 */
const log = require("../Log");
const { LogLevel } = require("../Enums");
const Checksum = require("../Checksum");
const ContentsFile = require("../ContentsFile");
const ImageSet = require("../Types/ImageSet");

class Sequence {
  constructor(input) {
    this.input = input;

    // Determine if source file has changed since last build.
    // We just check the first frame, and if that one is unchanged we assume
    // the entire sequence is unchanged.
    const checksum = new Checksum(this.firstFrameSource());
    if (!checksum.isChanged()) {
      log("Source file unchanged. Skipping.", LogLevel.skip);
      return;
    }

    // Get frame padding from source (number of digits in sequence numbering).
    const framePadding = this.framePadding();

    // Generate the frames for each action.
    this.input.actions.forEach((action) => {
      for (let i = 0; i <= action.end - action.start; i++) {
        const sourceFrame = action.start + i;
        const seqFrame = this.zeroFill(i + 1, 2);

        // Replace framepadding placeholder with the source frame number.
        const source = this.input.source.replace(
          "#".repeat(framePadding),
          this.zeroFill(sourceFrame, framePadding)
        );

        new ImageSet({
          name: `${this.input.name}_${action.name}_${seqFrame}`,
          source: source,
          size: this.input.size,
          format: this.input.format,
          target: this.input.target,
          devices: this.input.devices,
        });
      }
    });
  }

  // MARK: - Convenience

  /**
   * Pads a number with zeros to a predetermined string size.
   *
   * @param {Number} number
   * @param {Number} size
   *
   * @return {String}
   */
  zeroFill(number, size) {
    number = number.toString();
    while (number.length < size) number = "0" + number;

    return number;
  }

  /**
   * Determine frame padding size from the source string.
   *
   * @return {Number}
   */
  framePadding() {
    return this.input.source.replace(/[^\#]/g, "").length;
  }

  /**
   * Get path to first frame from the source string.
   *
   * @return {String}
   */
  firstFrameSource() {
    const framePadding = this.framePadding();

    // Get first frame.
    const source = this.input.source.replace(
      "#".repeat(framePadding),
      this.zeroFill(1, framePadding)
    );

    return source;
  }
}

module.exports = Sequence;
