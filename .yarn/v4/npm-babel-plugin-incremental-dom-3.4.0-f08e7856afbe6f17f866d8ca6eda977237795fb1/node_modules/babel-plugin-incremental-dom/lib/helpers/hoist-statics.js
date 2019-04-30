"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addStaticHoist;

var _hoist = require("./hoist");

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Hoists the static attributes array, so that the array instance is not
// recreated multiple times.
function addStaticHoist(scope, plugin, statics, keyIndex) {
  var id = (0, _hoist.addHoistedDeclarator)(scope, "statics", statics, plugin);

  if (keyIndex === -1) {
    return id;
  } else {
    var staticAttrs = statics.elements;
    var key = staticAttrs[keyIndex];
    staticAttrs[keyIndex] = t.stringLiteral("");

    // We need to assign the key variable's value to the statics array at `index`.
    return t.sequenceExpression([t.assignmentExpression("=", t.memberExpression(id, t.numericLiteral(keyIndex), true), key), id]);
  }
}