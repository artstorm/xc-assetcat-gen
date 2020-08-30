const Idiom = Object.freeze({
  iPhone: Symbol("iphone"),
  iPad: Symbol("ipad"),
  mac: Symbol("mac"),
  tv: Symbol("tv"),
  universal: Symbol("universal"),
});

const Scale = Object.freeze({
  "1x": Symbol("1x"),
  "2x": Symbol("2x"),
  "3x": Symbol("3x"),
});

const Type = Object.freeze({
  ImageSet: Symbol("ImageSet"),
  SpriteAtlas: Symbol("SpriteAtlas"),
  Sequence: Symbol("Sequence"),
  Level: Symbol("Level"),
});

const LogLevel = Object.freeze({
  info: Symbol("info"),
  success: Symbol("success"),
  skip: Symbol("skip"),
  error: Symbol("error"),
});

module.exports = {
  Idiom: Idiom,
  Scale: Scale,
  Type: Type,
  LogLevel: LogLevel,
};
