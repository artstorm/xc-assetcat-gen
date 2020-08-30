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



Install the tool per project in dedicated folder with:

```sh
npm install xc-assetcat-gen --save
```

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




## Config



9-1 (or what was the name?) slicing

Run the script:

```
# Builds the assets to a target folder for dev purposes.
npm run dev

# Builds the assets to the production folder in Xcode.
npm run prod

# Check code styling.
npm run check
```
