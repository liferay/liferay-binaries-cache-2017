// Deep retrieves from an object
"use strict";

exports.__esModule = true;
exports["default"] = get;

function get(object, path) {
  var i = undefined;
  for (i = 0; i < path.length; i++) {
    if (!object) {
      break;
    }
    object = object[path[i]];
  }

  return i === path.length ? object : undefined;
}

module.exports = exports["default"];