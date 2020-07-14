var colors = require("colors");
const { LogLevel } = require("./Enums");

module.exports = function (message, level = LogLevel.info) {
  switch (level) {
    case LogLevel.info:
      console.log(message.brightBlue);
      break;
    case LogLevel.skip:
      console.log(` → ${message}`.yellow);
      break;
    case LogLevel.success:
      console.log(` ✓ ${message}`.green);
      break;
    case LogLevel.error:
      console.log(` ✕ ${message}`.red);
      break;
    default:
      console.log(message);
  }
};
