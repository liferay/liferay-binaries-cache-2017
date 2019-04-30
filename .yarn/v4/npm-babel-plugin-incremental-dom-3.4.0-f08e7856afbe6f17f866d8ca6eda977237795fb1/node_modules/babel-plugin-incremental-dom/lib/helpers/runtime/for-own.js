"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectForOwn;

var _inject = require("../inject");

var _inject2 = _interopRequireDefault(_inject);

var _hasOwn = require("./has-own");

var _hasOwn2 = _interopRequireDefault(_hasOwn);

var _toFunctionCall = require("../ast/to-function-call");

var _toFunctionCall2 = _interopRequireDefault(_toFunctionCall);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Loops over all own properties, calling
// the specified iterator function with
// value and prop name.
// Depends on the _hasOwn helper.
function forOwnAST(plugin, ref, deps) {
  var hasOwn = deps.hasOwn;
  var object = t.identifier("object");
  var iterator = t.identifier("iterator");
  var prop = t.identifier("prop");

  /**
   * function _forOwn(object, iterator) {
   *   for (var prop in object) {
   *     if (hasOwn.call(object, prop)) {
   *       iterator(object[prop], prop);
   *     }
   *   }
   * }
   */
  return t.functionExpression(ref, [object, iterator], t.blockStatement([t.forInStatement(t.variableDeclaration("var", [t.variableDeclarator(prop)]), object, t.ifStatement((0, _toFunctionCall2.default)(t.memberExpression(hasOwn, t.identifier("call")), [object, prop]), t.expressionStatement((0, _toFunctionCall2.default)(iterator, [t.memberExpression(object, prop, true), prop]))))]));
}

function injectForOwn(plugin) {
  return (0, _inject2.default)(plugin, "forOwn", forOwnAST, {
    hasOwn: _hasOwn2.default
  });
}