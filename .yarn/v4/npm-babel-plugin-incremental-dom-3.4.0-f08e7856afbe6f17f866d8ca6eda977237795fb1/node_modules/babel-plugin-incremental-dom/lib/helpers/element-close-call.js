"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = elementCloseCall;

var _toFunctionCall = require("./ast/to-function-call");

var _toFunctionCall2 = _interopRequireDefault(_toFunctionCall);

var _toReference = require("./ast/to-reference");

var _toReference2 = _interopRequireDefault(_toReference);

var _idomMethod = require("./idom-method");

var _idomMethod2 = _interopRequireDefault(_idomMethod);

var _isComponent = require("./is-component");

var _isComponent2 = _interopRequireDefault(_isComponent);

var _attributes = require("./attributes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the closing element's function call.
function elementCloseCall(path, plugin) {
  var node = path.node;

  // Self closing elements that do not contain a SpreadAttribute will use `elementVoid`,
  // so the closing `elementClose` is not needed.
  if (node.selfClosing && !(0, _attributes.hasSpread)(path.get("attributes"))) {
    return null;
  }

  var name = path.get("name");
  var useReference = (0, _isComponent2.default)(name, plugin);
  return (0, _toFunctionCall2.default)((0, _idomMethod2.default)("elementClose", plugin), [(0, _toReference2.default)(name.node, useReference)]);
}