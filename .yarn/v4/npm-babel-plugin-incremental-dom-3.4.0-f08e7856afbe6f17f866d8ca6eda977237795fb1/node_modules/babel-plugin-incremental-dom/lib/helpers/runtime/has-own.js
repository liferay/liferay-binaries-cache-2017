"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectHasOwn;

var _inject = require("../inject");

var _inject2 = _interopRequireDefault(_inject);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Caches a reference to Object#hasOwnProperty.
function hasOwnAST() {
  /**
   * var _hasOwn = Object.prototype.hasOwnProperty;
   */
  return t.memberExpression(t.memberExpression(t.identifier("Object"), t.identifier("prototype")), t.identifier("hasOwnProperty"));
}

function injectHasOwn(plugin) {
  return (0, _inject2.default)(plugin, "hasOwn", hasOwnAST);
}