"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRootJSX;

var _isReturned = require("./is-returned");

var _isReturned2 = _interopRequireDefault(_isReturned);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootElementFinder = {
  JSXElement: function JSXElement(path, state) {
    var jsx = state.jsx;
    var crossedFunction = state.crossedFunction;

    // No need to traverse our JSX element.

    if (path === jsx) {
      path.skip();
      return;
    }

    var returned = (0, _isReturned2.default)(jsx);
    var otherIsReturned = (0, _isReturned2.default)(path);

    // We're looking for a root element, which must be returned by the function.
    if (otherIsReturned && (crossedFunction || !returned)) {
      state.root = false;
      path.stop();
    }
  },


  // Don't traverse into other functions, since they cannot contain the root.
  Function: function Function(path) {
    path.skip();
  }
};

// Detects if this JSX element is the root element.
// It is not the root if there is another root element in this
// or a higher function scope.
function isRootJSX(path) {
  var state = {
    root: true,
    crossedFunction: false,
    jsx: path
  };

  path.findParent(function (path) {
    if (path.isJSXElement()) {
      state.root = false;
    } else if (path.isFunction() || path.isProgram()) {
      path.traverse(rootElementFinder, state);
      state.crossedFunction = true;
    }

    // End early if another JSXElement is found.
    return !state.root;
  });

  return state.root;
}