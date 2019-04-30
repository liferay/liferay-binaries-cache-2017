"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toFunctionCallStatement;

var _toFunctionCall = require("./to-function-call");

var _toFunctionCall2 = _interopRequireDefault(_toFunctionCall);

var _toStatement = require("./to-statement");

var _toStatement2 = _interopRequireDefault(_toStatement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper to create a function call statement in AST.
function toFunctionCallStatement(t, functionName, args) {
  return (0, _toStatement2.default)(t, (0, _toFunctionCall2.default)(t, functionName, args));
}