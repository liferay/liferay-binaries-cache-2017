"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectRenderArbitrary;

var _inject = require("../inject");

var _inject2 = _interopRequireDefault(_inject);

var _forOwn = require("./for-own");

var _forOwn2 = _interopRequireDefault(_forOwn);

var _toFunctionCall = require("../ast/to-function-call");

var _toFunctionCall2 = _interopRequireDefault(_toFunctionCall);

var _idomMethod = require("../idom-method");

var _idomMethod2 = _interopRequireDefault(_idomMethod);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Isolated AST code to determine if a value is textual
// (strings and numbers).
function isTextual(type, value) {
  return t.logicalExpression("||", t.binaryExpression("===", type, t.stringLiteral("number")), t.logicalExpression("||", t.binaryExpression("===", type, t.stringLiteral("string")), t.logicalExpression("&&", t.binaryExpression("===", type, t.stringLiteral("object")), t.binaryExpression("instanceof", value, t.identifier("String")))));
}

// Isolated AST code to determine if a value is a wrapped
// DOM closure.
function isDOMWrapper(type, value) {
  return t.logicalExpression("&&", t.binaryExpression("===", type, t.stringLiteral("function")), t.memberExpression(value, t.identifier("__jsxDOMWrapper")));
}

// Isolated AST code to determine if a value an Array.
function isArray(value) {
  return (0, _toFunctionCall2.default)(t.memberExpression(t.identifier("Array"), t.identifier("isArray")), [value]);
}

// Isolated AST code to determine if a value an Object.
function isObject(type, value) {
  return t.logicalExpression("&&", t.binaryExpression("===", type, t.stringLiteral("object")), t.binaryExpression("===", (0, _toFunctionCall2.default)(t.identifier("String"), [value]), t.stringLiteral("[object Object]")));
}

// Renders an arbitrary JSX Expression into the DOM.
// Valid types are strings, numbers, and DOM closures.
// It may also be an Array or Object, which will be iterated
// recursively to find a valid type.
// Depends on the _forOwn helper.
function renderArbitraryAST(plugin, ref, deps) {
  var forOwn = deps.forOwn;
  var child = t.identifier("child");
  var type = t.identifier("type");
  var forEach = t.memberExpression(child, t.identifier("forEach"));

  /**
   * function _renderArbitrary(child) {
   *   var type = typeof child;
   *   if (type === "number" || (type === string || type === 'object' && child instanceof String)) {
   *     text(child);
   *   } else if (type === "function" && child.__jsxDOMWrapper) {
   *     child();
   *   } else if (Array.isArray(child)) {
   *     child.forEach(_renderArbitrary);
   *   } else if (type === 'object' && String(child) === '[object Object]') {
   *     _forOwn(child, _renderArbitrary);
   *   }
   * }
   */
  return t.functionExpression(ref, [child], t.blockStatement([t.variableDeclaration("var", [t.variableDeclarator(type, t.unaryExpression("typeof", child))]), t.IfStatement(isTextual(type, child), t.blockStatement([t.expressionStatement((0, _toFunctionCall2.default)((0, _idomMethod2.default)("text", plugin), [child]))]), t.ifStatement(isDOMWrapper(type, child), t.blockStatement([t.expressionStatement((0, _toFunctionCall2.default)(child, []))]), t.ifStatement(isArray(child), t.blockStatement([t.expressionStatement((0, _toFunctionCall2.default)(forEach, [ref]))]), t.ifStatement(isObject(type, child), t.blockStatement([t.expressionStatement((0, _toFunctionCall2.default)(forOwn, [child, ref]))])))))]));
}

function injectRenderArbitrary(plugin) {
  return (0, _inject2.default)(plugin, "renderArbitrary", renderArbitraryAST, {
    forOwn: _forOwn2.default
  });
}