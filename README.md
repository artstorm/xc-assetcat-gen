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

In the installation folder, also add an `index.js` file with this content:

```js
const config = require("./config");
const Generator = require("xc-assetcat-gen");

this.config = {
  source_images_root: config.source_images_root,
  asset_catalog_root: config.asset_catalog_root,
  author: config.author
};

const parser = new Generator.Parser(config.assets);
parser.parse();
````

## Config

In the tool's installation folder, create a `config.js` file with this content:

```js
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

### ImageSet

Generate from a single image.

```js
{
  name: "HUD",
  source: "/Output/HUD/hud.png",
  target: "UI/HUD",
  size: { width: 351, height: 36 },
  format: "png",
  type: Type.ImageSet,
  devices: [Idiom.iPhone, Idiom.iPad, Idiom.mac, Idiom.tv]
}
```

* name: The name the asset will get in the asset catalog.
* source: Relative path to the source file.
* target: The path of folders to generate to the asset in the asset catalog.
* size: The size final size of the asset in points.
* format: The file format of the generated versions of the asset.
* type: Lets the generator now it's a single ImageSet.
* devices: The devices to generate the asset for.

### Image Sequence

Generate from an image sequence.

```js
{
  name: "Drone",
  source: "/Output/Drone/drone_##.png",
  target: "Drone",
  actions: [
    { name: "Jump", start: 0, end: 30 },
    { name: "Run", start: 31, end: 48 }
  ],
  size: { width: 100, height: 100 },
  format: "png",
  type: Type.Sequence,
  devices: [Idiom.iPhone, Idiom.iPad, Idiom.mac, Idiom.tv]
}
```

* name: The base name the sequence will get in the Xcode asset catalog.
* source: Relative path to the source file. `##` should match the number of digits used for the sequence.
* actions: Allows splitting the sequence into different actions, by setting start and end frame for each action. `name` will be used as a suffix before the number in the asset catalog.
* target: The path to generate to the asset in the asset catalog.
* size: The size final size of the asset in points.
* format: The file format of the generated versions of the asset.
* type: Lets the generator now it's a sequence.
* devices: The devices to generate the assets for.

### Sprite Atlas

Group multiple imagesets and/or sequences to a Sprite Atlas.

```js
{
  name: "Drone Sprite Atlas",
  target: "Enemies",
  type: Type.SpriteAtlas,
  assets: [
  ]
}

```

* name: The name of the Sprite Atlas in the Xcode Asset Catalog.
* target: The path to create the Sprite Atlas in the Xcode asset catalog.
* type: Lets the generator now it's a sprite atlas.
* assets: An array of ImageSets and/or image sequnces to generate inside the Sprite Atlas.

### Level

To be documented...

### Group

To be documented...

## Generate

The tool provides a dev mode to try the generation to an `output` folder in the tools installation folder.

```
# Builds the assets to a target folder for dev purposes.
npm run dev

# Builds the assets to the assets folder in Xcode.
npm run prod
```
