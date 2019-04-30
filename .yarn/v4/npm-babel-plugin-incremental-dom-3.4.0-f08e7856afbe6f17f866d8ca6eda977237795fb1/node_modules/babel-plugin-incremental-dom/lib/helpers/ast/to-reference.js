"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toReference;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Helper to transform a JSX identifier into a normal reference.
function toReference(node) {
  var identifier = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  if (typeof node === "string") {
    return node.split(".").map(function (s) {
      return t.identifier(s);
    }).reduce(function (obj, prop) {
      return t.memberExpression(obj, prop);
    });
  }

  if (t.isJSXIdentifier(node)) {
    return identifier ? t.identifier(node.name) : t.stringLiteral(node.name);
  }

  if (t.isJSXMemberExpression(node)) {
    return t.memberExpression(toReference(node.object, true), toReference(node.property, true));
  }

  return node;
}