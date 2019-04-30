"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractOpenArguments;

var _isLiteralOrUndefined = require("./is-literal-or-undefined");

var _isLiteralOrUndefined2 = _interopRequireDefault(_isLiteralOrUndefined);

var _hoistStatics = require("./hoist-statics");

var _hoistStatics2 = _interopRequireDefault(_hoistStatics);

var _uuid = require("./uuid");

var _uuid2 = _interopRequireDefault(_uuid);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Extracts attributes into the appropriate
// attribute array. Static attributes and the key
// are placed into static attributes, and expressions
// are placed into the variadic attributes.
function extractOpenArguments(path, plugin) {
  var attributes = path.get("attributes");
  var scope = path.scope;
  var _plugin$opts = plugin.opts;
  var hoist = _plugin$opts.hoist;
  var forceStatics = _plugin$opts.forceStatics;

  var attrs = [];
  var staticAttrs = [];
  var key = null;
  var keyIndex = -1;
  var statics = t.arrayExpression(staticAttrs);

  attributes.forEach(function (attribute) {
    if (attribute.isJSXSpreadAttribute()) {
      attrs.push({
        name: null,
        value: attribute.get("argument").node,
        isSpread: true
      });
      return;
    }

    var namePath = attribute.get("name");
    var name = void 0;
    if (namePath.isJSXIdentifier()) {
      name = t.stringLiteral(namePath.node.name);
    } else {
      name = t.stringLiteral(namePath.node.namespace.name + ":" + namePath.node.name.name);
    }
    var value = attribute.get("value");
    var node = value.node;

    // Attributes without a value are interpreted as `true`.
    if (!node) {
      value.replaceWith(t.jSXExpressionContainer(t.booleanLiteral(true)));
    }

    // Get the value inside the expression.
    if (value.isJSXExpressionContainer()) {
      value = value.get("expression");
      node = value.node;
    }

    var literal = (0, _isLiteralOrUndefined2.default)(value);

    // The key attribute must be passed to the `elementOpen` call.
    if (name.value === "key") {
      key = node;

      // If it's not a literal key, we must assign it in the statics array.
      if (!literal) {
        if (!value.isIdentifier()) {
          node = value.scope.maybeGenerateMemoised(node);
          key = t.assignmentExpression("=", node, key);
        }

        keyIndex = staticAttrs.length + 1;
        literal = true;
      }
    }

    if (literal) {
      staticAttrs.push(name, node);
    } else {
      attrs.push({
        name: name,
        value: node,
        isSpread: false
      });
    }
  });

  if (staticAttrs.length > 0 && !key) {
    if (forceStatics) {
      // Generate a uuid to be used as the key.
      key = t.stringLiteral((0, _uuid2.default)());
    } else {
      // Don't use statics if a "key" isn't passed, as recommended by the
      // incremental dom documentation:
      // http://google.github.io/incremental-dom/#rendering-dom/statics-array.
      for (var i = 0; i < staticAttrs.length; i += 2) {
        attrs.push({
          name: staticAttrs[i],
          value: staticAttrs[i + 1],
          isSpread: false
        });
      }
      staticAttrs = [];
    }
  }

  if (attrs.length === 0) {
    attrs = null;
  }
  if (staticAttrs.length === 0) {
    statics = null;
  } else if (hoist) {
    statics = (0, _hoistStatics2.default)(scope, plugin, statics, keyIndex);
  }

  return { key: key, statics: statics, attrs: attrs };
}