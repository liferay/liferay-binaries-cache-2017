"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toFunctionCall;

var _toReference = require("./to-reference");

var _toReference2 = _interopRequireDefault(_toReference);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper to create a function call in AST.
function toFunctionCall(functionName, args) {
  return t.callExpression((0, _toReference2.default)(functionName), args);
}