"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isComponent;
var componentTester = /^[A-Z]/;

// Detects if the given tag represents a component (that is, if it starts with a
// capital letter).
function isComponent(path, _ref) {
  var opts = _ref.opts;

  if (!opts.components || !path.isJSXIdentifier()) {
    return false;
  }

  return componentTester.test(path.node.name);
}