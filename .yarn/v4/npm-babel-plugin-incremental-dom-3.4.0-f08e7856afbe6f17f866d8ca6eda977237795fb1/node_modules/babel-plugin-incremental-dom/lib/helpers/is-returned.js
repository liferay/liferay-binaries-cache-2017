"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isReturned;
// This node is returned if it's parent is explicitly or
// implicitly returned.
function isReturned(path) {
  var parent = path.parentPath;
  return parent.isReturnStatement() || parent.isArrowFunctionExpression();
}