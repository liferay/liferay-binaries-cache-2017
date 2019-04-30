"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flattenExpressions;

var _toStatement = require("./to-statement");

var _toStatement2 = _interopRequireDefault(_toStatement);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper to flatten out sequence expressions into a top level
// expression statements.
function flattenExpressions(expressions) {
  var nodes = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  return expressions.reduce(function (nodes, node) {
    if (t.isSequenceExpression(node)) {
      return flattenExpressions(node.expressions, nodes);
    }

    nodes.push((0, _toStatement2.default)(node));
    return nodes;
  }, nodes);
}