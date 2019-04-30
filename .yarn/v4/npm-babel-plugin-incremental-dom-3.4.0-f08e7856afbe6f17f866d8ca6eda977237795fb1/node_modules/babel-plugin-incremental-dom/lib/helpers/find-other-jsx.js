"use strict";

exports.__esModule = true;
exports["default"] = findOtherJSX;
var jsxVisitor = {
  shouldSkip: function shouldSkip(path) {
    // Don't descend into the current JSXElement.
    if (path.node === path.state.node) {
      return true;
    }

    // Don't descend into sibling functions.
    if (path.isFunction()) {
      return true;
    }
  },

  JSXElement: function JSXElement(node, parent, scope, state) {
    state.otherJSX = true;
    this.stop();
  }
};

// Detects if there are other JSXElements in a higher scope.

function findOtherJSX(path) {
  var state = { otherJSX: false, node: path.node };

  path.findParent(function (path) {
    if (path.isJSXElement()) {
      state.node = path.node;
    } else if (path.isFunction()) {
      path.traverse(jsxVisitor, state);
    } else if (path.isProgram()) {
      path.traverse(jsxVisitor, state);
    }

    // End early if another JSXElement is found.
    return state.otherJSX;
  });

  return state.otherJSX;
}

module.exports = exports["default"];