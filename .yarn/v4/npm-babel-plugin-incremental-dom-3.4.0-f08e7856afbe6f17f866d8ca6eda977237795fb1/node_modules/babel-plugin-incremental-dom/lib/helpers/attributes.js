"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasSpread = hasSpread;
exports.toAttrsArray = toAttrsArray;
exports.toAttrsCalls = toAttrsCalls;

var _attr = require("./runtime/attr");

var _attr2 = _interopRequireDefault(_attr);

var _forOwn = require("./runtime/for-own");

var _forOwn2 = _interopRequireDefault(_forOwn);

var _toFunctionCall = require("./ast/to-function-call");

var _toFunctionCall2 = _interopRequireDefault(_toFunctionCall);

var _idomMethod = require("./idom-method");

var _idomMethod2 = _interopRequireDefault(_idomMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Detects if one of the attributes is a JSX Spread Attribute
function hasSpread(attributes) {
  return attributes.some(function (attr) {
    return attr.isJSXSpreadAttribute();
  });
}

// Returns an array of `name`-`value` attribute pairs
function toAttrsArray(attrs) {
  var pairsArray = [];
  attrs.forEach(function (_ref) {
    var name = _ref.name;
    var value = _ref.value;

    pairsArray.push(name);
    pairsArray.push(value);
  });

  return pairsArray;
}

// Returns an array of iDOM `attr` calls
function toAttrsCalls(attrs, plugin) {
  var attrCall = (0, _idomMethod2.default)("attr", plugin);
  var forOwn = (0, _forOwn2.default)(plugin);
  var forOwnAttr = (0, _attr2.default)(plugin);

  return attrs.map(function (_ref2) {
    var name = _ref2.name;
    var value = _ref2.value;
    var isSpread = _ref2.isSpread;

    if (isSpread) {
      return (0, _toFunctionCall2.default)(forOwn, [value, forOwnAttr]);
    }

    return (0, _toFunctionCall2.default)(attrCall, [name, value]);
  });
}