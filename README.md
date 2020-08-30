# xc assetcat gen

Xcode asset catalog generator for game development. 

[![GitHub Actions](https://github.com/artstorm/xc-assetcat-gen/workflows/style/badge.svg)](https://github.com/artstorm/xc-assetcat-gen/actions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Builds the asset catalog from source image assets with optimized sizes for iPad, iPhone, AppleTV and Mac.

## Features

* Specifically targets game development with SpriteKit.
* Creates sizes in 1x, 2x and 3x per device type.
* Saves the output directly to the asset catalog in Xcode.
* Handles vector images as Universal, Single Scale. PDF and SVG (Xcode 12+).
* Tracks converted images so on each re-generation only new or updated source images are re-generated to the asset catalog.
* In early development, available as-is.
* ...

I've developed the tool for personal usage, so everything is subject to change between versions and it does have quite a few rough edges.





Run the script:

```
# Builds the assets to a target folder for dev purposes.
npm run dev

# Builds the assets to the production folder in Xcode.
npm run prod

# Check code styling.
npm run check
```
