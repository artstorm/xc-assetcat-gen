# 

[![GitHub Actions](https://github.com/artstorm/xc-assetcat-gen/workflows/style/badge.svg)](https://github.com/artstorm/xc-assetcat-gen/actions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![Swift Gamedev](https://img.shields.io/badge/swift-gamedev-brightgreen.svg?style=flat)
[![Twitter: @artstorm](https://img.shields.io/badge/twitter-@artstorm-blue.svg?style=flat)](https://twitter.com/artstorm)

> **Note:** This repository contains the core code of the xcode asset catalog generator framework. If you want to use the generator in a project, visit the main [Xcode Asset Catalog Generator repository](https://github.com/artstorm/xcode-asset-catalog-generator).

xc assetcat gen is a batch processing framework that builds the asset catalog from source assets and generates images with optimized sizes for iPad, iPhone, AppleTV and Mac.

## Features

* Creates sizes in @1x, @2x and @3x per device type.
* Saves the output directly to the asset catalog in Xcode.
* Handles numbered image sequences.
* Handles Sprite Atlas generation.
* Handles vector images as Universal, Single Scale. PDF and SVG (Xcode 12+).
* Specifically targets game development with SpriteKit.
* Tracks converted images so on each re-generation only new or updated source images are generated to the asset catalog.
* In early development, available as-is. The same goes for the documentation.

I've developed the tool for personal usage, so everything is subject to change between versions and it does have quite a few rough edges.

### Reference

The [wiki](https://github.com/artstorm/xc-assetcat-gen/wiki
) has more detailed documentation of how to configure and use the tool.
