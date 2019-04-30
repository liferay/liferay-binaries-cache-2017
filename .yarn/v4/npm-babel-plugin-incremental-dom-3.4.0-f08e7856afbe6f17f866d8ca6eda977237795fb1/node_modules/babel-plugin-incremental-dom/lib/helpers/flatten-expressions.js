"use strict";

exports.__esModule = true;
exports["default"] = flattenExpressions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _astToStatement = require("./ast/to-statement");

var _astToStatement2 = _interopRequireDefault(_astToStatement);

// Helper to flatten out sequence expressions into a top level
// expression statements.

function flattenExpressions(t, expressions) {
  var nodes = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  return expressions.reduce(function (nodes, node) {
    if (t.isSequenceExpression(node)) {
      flattenExpressions(t, node.expressions, nodes);
    } else {
      nodes.push(_astToStatement2["default"](t, node));
    }
    return nodes;
  }, nodes);
}

module.exports = exports["default"];