"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = elementOpenCall;

var _toFunctionCall = require("./ast/to-function-call");

var _toFunctionCall2 = _interopRequireDefault(_toFunctionCall);

var _toReference = require("./ast/to-reference");

var _toReference2 = _interopRequireDefault(_toReference);

var _idomMethod = require("./idom-method");

var _idomMethod2 = _interopRequireDefault(_idomMethod);

var _isComponent = require("./is-component");

var _isComponent2 = _interopRequireDefault(_isComponent);

var _extractOpenArguments2 = require("./extract-open-arguments");

var _extractOpenArguments3 = _interopRequireDefault(_extractOpenArguments2);

var _attributes = require("./attributes");

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Returns the opening element's function call.
function elementOpenCall(path, plugin) {
  var name = path.get("name");
  var useReference = (0, _isComponent2.default)(name, plugin);
  var tag = (0, _toReference2.default)(name.node, useReference);
  var args = [tag];

  var _extractOpenArguments = (0, _extractOpenArguments3.default)(path, plugin);

  var key = _extractOpenArguments.key;
  var statics = _extractOpenArguments.statics;
  var attrs = _extractOpenArguments.attrs;

  // Only push arguments if they're needed

  if (key || statics) {
    args.push(key || t.nullLiteral());
  }
  if (statics) {
    args.push(statics);
  }

  // If there is a spread element, we need to use
  // the elementOpenStart/elementOpenEnd syntax.
  // This allows spreads to be transformed into
  // attr(name, value) calls.
  if ((0, _attributes.hasSpread)(path.get("attributes"))) {
    var expressions = [(0, _toFunctionCall2.default)((0, _idomMethod2.default)("elementOpenStart", plugin), args)].concat(_toConsumableArray((0, _attributes.toAttrsCalls)(attrs, plugin)), [(0, _toFunctionCall2.default)((0, _idomMethod2.default)("elementOpenEnd", plugin), [tag])]);

    return t.sequenceExpression(expressions);
  }

  if (attrs) {
    // Only push key and statics if they have not
    // already been pushed.
    if (!statics) {
      if (!key) {
        args.push(t.nullLiteral());
      }
      args.push(t.nullLiteral());
    }

    args.push.apply(args, _toConsumableArray((0, _attributes.toAttrsArray)(attrs)));
  }

  var selfClosing = path.node.selfClosing;
  var elementFunction = selfClosing ? "elementVoid" : "elementOpen";
  return (0, _toFunctionCall2.default)((0, _idomMethod2.default)(elementFunction, plugin), args);
}