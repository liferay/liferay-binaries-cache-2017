"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isLiteralOrUndefined = require("./is-literal-or-undefined");

var _isLiteralOrUndefined2 = _interopRequireDefault(_isLiteralOrUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addClosureVar(expression, closureVars) {
  var init = expression.node;
  var id = expression.scope.generateUidIdentifierBasedOnNode(init);

  closureVars.push({ id: id, init: init });
  expression.replaceWith(id);
}

function last(array) {
  return array[array.length - 1];
}

// Extracts variable expressions into an array of closure parameters,
// so that when the closure is finally evaluated, it will have the correct
// values.
var expressionExtractor = {
  JSXSpreadAttribute: function JSXSpreadAttribute(path) {
    var closureVarsStack = this.closureVarsStack;

    addClosureVar(path.get("argument"), last(closureVarsStack));
  },
  JSXExpressionContainer: function JSXExpressionContainer(path) {
    var expression = path.get("expression");
    // If the variable is constant (or will be wrapped), don't extract.
    if ((0, _isLiteralOrUndefined2.default)(expression) || expression.isJSXElement()) {
      return;
    }

    var closureVarsStack = this.closureVarsStack;

    addClosureVar(expression, last(closureVarsStack));
  }
};

exports.default = expressionExtractor;