/**
 * Configuration Properties.
 *
 * A static convenience class to access the configuration properties defined
 * in the main module.
 */
const main = require.main;

class Config {
  /**
   * Get root path to source images.
   *
   * @return {String}
   */
  static get sourceImagesRoot() {
    return main.exports.config.source_images_root;
  }

  /**
   * Get root path to asset catalog.
   *
   * @return {String}
   */
  static get assetCatalogRoot() {
    // Production path.
    if (process.env.npm_lifecycle_event == "prod") {
      return main.exports.config.asset_catalog_root;
    }

    // Else assume dev and return dev path for output of generated asset catalog.
    return "./output";
  }

  static get author() {
    return main.exports.config.author;
  }
}

module.exports = Config;
