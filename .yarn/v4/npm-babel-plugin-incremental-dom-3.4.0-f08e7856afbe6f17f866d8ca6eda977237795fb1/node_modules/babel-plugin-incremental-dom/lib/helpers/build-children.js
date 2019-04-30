"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = buildChildren;

var _cleanText = require("./clean-text");

var _cleanText2 = _interopRequireDefault(_cleanText);

var _toFunctionCall = require("./ast/to-function-call");

var _toFunctionCall2 = _interopRequireDefault(_toFunctionCall);

var _renderArbitrary = require("./runtime/render-arbitrary");

var _renderArbitrary2 = _interopRequireDefault(_renderArbitrary);

var _idomMethod = require("./idom-method");

var _idomMethod2 = _interopRequireDefault(_idomMethod);

var _isLiteralOrUndefined = require("./is-literal-or-undefined");

var _isLiteralOrUndefined2 = _interopRequireDefault(_isLiteralOrUndefined);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Transforms the children into an array of iDOM function calls
function buildChildren(children, plugin) {
  var renderArbitraryRef = void 0;
  var replacedElements = plugin.replacedElements;


  children = children.reduce(function (children, child) {
    var wasInExpressionContainer = child.isJSXExpressionContainer();
    if (wasInExpressionContainer) {
      child = child.get("expression");
    }

    if (child.isJSXEmptyExpression()) {
      return children;
    }
    var node = child.node;

    if (child.isJSXText() || (0, _isLiteralOrUndefined2.default)(child)) {
      var value = node.value;
      var type = typeof value === "undefined" ? "undefined" : _typeof(value);

      // Clean up the text, so we don't have to have multiple TEXT nodes.
      if (type === "string") {
        if (!wasInExpressionContainer) {
          value = (0, _cleanText2.default)(value);
        }
        if (!value) {
          return children;
        }
      }

      // Only strings and numbers will print, anything else is skipped.
      if (type === "string" || type === "number") {
        node = (0, _toFunctionCall2.default)((0, _idomMethod2.default)("text", plugin), [t.stringLiteral("" + value)]);
      } else {
        return children;
      }
    } else if (wasInExpressionContainer && !replacedElements.has(node)) {
      // Arbitrary expressions, e.g. variables, need to be inspected at runtime
      // to determine how to render them.
      renderArbitraryRef = renderArbitraryRef || (0, _renderArbitrary2.default)(plugin);

      node = (0, _toFunctionCall2.default)(renderArbitraryRef, [node]);
    }

    children.push(node);
    return children;
  }, []);

  return children;
}