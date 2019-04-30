"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toStatement;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Helper to transform an expression into an expression statement.
function toStatement(expression) {
  if (t.isFunctionExpression(expression)) {
    return t.toStatement(expression);
  }
  if (!t.isStatement(expression)) {
    return t.expressionStatement(expression);
  }
  return expression;
}