"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extractExpressions = require("./extract-expressions");

var _extractExpressions2 = _interopRequireDefault(_extractExpressions);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Take single use variable declarations and move them inside
// the JSX Expression Container where they are referenced.
var expressionInliner = {
  JSXExpressionContainer: function JSXExpressionContainer(path) {
    var expression = path.get("expression");
    if (!expression.isIdentifier()) {
      return;
    }

    var binding = path.scope.getBinding(expression.node.name);
    if (!binding || binding.references > 1 || !binding.constant) {
      return;
    }

    var declarator = binding.path;
    if (!declarator.isVariableDeclarator()) {
      return;
    }

    var init = declarator.get("init");
    if (!init.isJSXElement()) {
      return;
    }

    var closureVars = [];
    init.traverse(_extractExpressions2.default, { closureVarsStack: [closureVars] });

    expression.replaceWith(init.node);
    declarator.replaceWithMultiple(closureVars.map(function (cv) {
      return t.variableDeclarator(cv.id, cv.init);
    }));
  }
};

exports.default = expressionInliner;