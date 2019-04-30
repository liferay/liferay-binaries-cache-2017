"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = childAncestor;

var _isRootJsx = require("./is-root-jsx");

var _isRootJsx2 = _interopRequireDefault(_isRootJsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// It is only a child if it is a descendant of a JSX element but not a
// JSX Attribute.
function descendant(path) {
  var isChild = false;

  var direct = directChild(path);
  if (direct) {
    return direct;
  }

  path.findParent(function (path) {
    if (path.isJSXAttribute()) {
      // Stop traversing, we are not a child.
      return true;
    }

    if (path.isJSXElement()) {
      if (!directChild(path)) {
        // This element is the top of a tree of JSX elements
        // If it's the root tree, we are a child.
        isChild = (0, _isRootJsx2.default)(path);
        return true;
      }
    }
  });

  if (!isChild) {
    return null;
  }

  return path.findParent(function (path) {
    return !path.parentPath || path.parentPath.isJSX();
  });
}

// It is only a child if it's immediate parent is a JSX element,
// or it is an ExpressionContainer who's parent is.
function directChild(path) {
  var isChild = false;
  var child = path;
  var last = path;

  while (path = path.parentPath) {
    if (path.isJSXElement()) {
      isChild = true;
      break;
    }

    if (path.isJSXExpressionContainer()) {
      // Defer to what the parent is.
      continue;
    }

    if (path.isSequenceExpression()) {
      var expressions = path.get("expressions");
      // If we didn't traverse up from the last expression, we're not really
      // a child.
      if (expressions[expressions.length - 1] !== last) {
        break;
      }

      // Sequence expressions can be considered a child JSX element if the element
      // was the last expression.
      if (last.isJSXElement()) {
        child = path;
      }
    } else if (!(path.isConditionalExpression() || path.isLogicalExpression())) {
      break;
    }

    last = path;
  }

  return isChild ? child : null;
}

function useFastRoot(path, _ref) {
  var _ref$fastRoot = _ref.fastRoot;
  var fastRoot = _ref$fastRoot === undefined ? false : _ref$fastRoot;

  path.find(function (path) {
    var comments = path.node.leadingComments;

    return comments && comments.find(function (comment) {
      var match = /@incremental-dom.+(enable|disable)-fastRoot/.exec(comment.value);

      if (match) {
        fastRoot = match[1] === "enable";
        return true;
      }
    });
  });

  return fastRoot;
}

// Detects if this element is not a child of another JSX element
function childAncestor(path, _ref2) {
  var opts = _ref2.opts;

  return (useFastRoot(path, opts) ? descendant : directChild)(path);
}