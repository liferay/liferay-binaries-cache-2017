"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectAttr;

var _inject = require("../inject");

var _inject2 = _interopRequireDefault(_inject);

var _toFunctionCall = require("../ast/to-function-call");

var _toFunctionCall2 = _interopRequireDefault(_toFunctionCall);

var _idomMethod = require("../idom-method");

var _idomMethod2 = _interopRequireDefault(_idomMethod);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Flip flops the arguments when calling iDOM's
// `attr`, so that this function may be used
// as an iterator like an Object#forEach.
function attrAST(plugin, ref) {
  var name = t.identifier("name");
  var value = t.identifier("value");

  /**
   * function _attr(value, prop) {
   *   attr(prop, value);
   * }
   */
  return t.functionExpression(ref, [value, name], t.blockStatement([t.expressionStatement((0, _toFunctionCall2.default)((0, _idomMethod2.default)("attr", plugin), [name, value]))]));
}

function injectAttr(plugin) {
  return (0, _inject2.default)(plugin, "attr", attrAST);
}