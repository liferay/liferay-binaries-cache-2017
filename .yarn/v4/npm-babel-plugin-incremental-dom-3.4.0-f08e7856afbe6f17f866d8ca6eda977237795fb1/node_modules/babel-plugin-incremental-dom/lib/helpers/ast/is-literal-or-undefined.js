"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLiteralOrUndefined;
// Literals and `undefined` are treated as constant values in attributes and
// children.
function isLiteralOrUndefined(path) {
  return path.isLiteral() || path.isIdentifier({ name: "undefined" });
}