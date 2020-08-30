# xc assetcat gen

Xcode asset catalog generator for game development. 

[![GitHub Actions](https://github.com/artstorm/xc-assetcat-gen/workflows/style/badge.svg)](https://github.com/artstorm/xc-assetcat-gen/actions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Builds the asset catalog from source image assets with optimized sizes for iPad, iPhone, AppleTV and Mac.

## Features

* Specifically targets game development with SpriteKit.
* Creates sizes in 1x, 2x and 3x per device type.
* Saves the output directly to the asset catalog in Xcode.
* Handles numbered image sequences.
* Handles vector images as Universal, Single Scale. PDF and SVG (Xcode 12+).
* Tracks converted images so on each re-generation only new or updated source images are re-generated to the asset catalog.
* In early development, available as-is. The same goes for the documentation.
* ...

I've developed the tool for personal usage, so everything is subject to change between versions and it does have quite a few rough edges.

## Usage

xc assetcat gen is available on [npm](https://www.npmjs.com/package/xc-assetcat-gen) and requires nodejs.

### Installation 

Install the tool per project in dedicated folder.

In the folder, create a `package.json` file with this content:

```json
{
  "scripts": {
    "dev": "node index.js",
    "prod": "node index.js"
  },
  "dependencies": {
    "xc-assetcat-gen": "0.0.2"
  }
}
```

And then install the generator:

```sh
npm install
```

## Config

In the tool's installation folder, create a `config.js` file with this content:

```
const { Enums } = require("xc-assetcat-gen");

// Enums
const Idiom = Enums.Idiom;
const Scale = Enums.Scale;
const Type = Enums.Type;

module.exports = {
  // Root paths for input and output of assets
  source_images_root: "/Path/To/Game/Source/Art",
  asset_catalog_root: "/Path/To/Game/Asset/Catalog/Assets.xcassets",

  // Author of asset catalog.
  author: "com.bitbebop",

  assets: [
    // Array of assets... 
  ]
};
```

Then fill the `assets` array with the generation specification from the source art.


## Generate

The tool provides a dev mode to try the generation to an `output` folder in the tools installation folder.

```
# Builds the assets to a target folder for dev purposes.
npm run dev

# Builds the assets to the assets folder in Xcode.
npm run prod
```
