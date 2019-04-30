"use strict";

exports.__esModule = true;
exports["default"] = attrsToAttrCalls;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _runtimeAttr = require("./runtime/attr");

var _runtimeAttr2 = _interopRequireDefault(_runtimeAttr);

var _runtimeForOwn = require("./runtime/for-own");

var _runtimeForOwn2 = _interopRequireDefault(_runtimeForOwn);

var _astToFunctionCall = require("./ast/to-function-call");

var _astToFunctionCall2 = _interopRequireDefault(_astToFunctionCall);

var _idomMethod = require("./idom-method");

var _idomMethod2 = _interopRequireDefault(_idomMethod);

// Transforms an attribute array into sequential attr calls.

function attrsToAttrCalls(t, file, attrs) {
  var forOwn = _runtimeForOwn2["default"](t, file);
  var forOwnAttr = _runtimeAttr2["default"](t, file);
  var current = [];

  return attrs.reduce(function (calls, attr) {
    if (t.isJSXSpreadAttribute(attr)) {
      calls.push(_astToFunctionCall2["default"](t, forOwn, [attr.argument, forOwnAttr]));
    } else {
      current.push(attr);
      if (current.length === 2) {
        calls.push(_astToFunctionCall2["default"](t, _idomMethod2["default"](file, "attr"), current));
        current = [];
      }
    }

    return calls;
  }, []);
}

module.exports = exports["default"];