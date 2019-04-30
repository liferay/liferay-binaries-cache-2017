"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;
  var _traverse = _ref.traverse;

  function traverse(path, visitor, state) {
    _traverse.explode(visitor);

    var node = path.node;

    if (!node) {
      return;
    }

    var type = node.type;

    var _ref2 = visitor[type] || {};

    var _ref2$enter = _ref2.enter;
    var enter = _ref2$enter === undefined ? [] : _ref2$enter;
    var _ref2$exit = _ref2.exit;
    var exit = _ref2$exit === undefined ? [] : _ref2$exit;


    enter.forEach(function (fn) {
      return fn.call(state, path, state);
    });
    if (!path.shouldSkip) {
      path.traverse(visitor, state);
      exit.forEach(function (fn) {
        return fn.call(state, path, state);
      });
    }
    path.shouldSkip = false;
  }

  var elementVisitor = {
    JSXNamespacedName: function JSXNamespacedName(path) {
      if (!this.opts.namespaceAttributes || path.parentPath.isJSXOpeningElement()) {
        throw path.buildCodeFrameError("JSX Namespaces aren't supported.");
      }
    },


    JSXElement: {
      enter: function enter(path) {
        var secondaryTree = this.secondaryTree;
        var root = this.root;
        var closureVarsStack = this.closureVarsStack;

        var needsWrapper = secondaryTree || root !== path && !(0, _isChildElement2.default)(path, this);

        // If this element needs to be wrapped in a closure, we need to transform
        // it's children without wrapping them.
        if (needsWrapper) {
          // If this element needs a closure wrapper, we need a new array of
          // closure parameters.
          closureVarsStack.push([]);

          var state = Object.assign({}, this, { secondaryTree: false, root: path });
          path.traverse(_extractExpressions2.default, state);
          path.traverse(elementVisitor, state);
        }
      },
      exit: function exit(path) {
        var root = this.root;
        var secondaryTree = this.secondaryTree;
        var replacedElements = this.replacedElements;
        var closureVarsStack = this.closureVarsStack;
        var hoist = this.opts.hoist;

        var childAncestorPath = (0, _isChildElement2.default)(path, this);
        var needsWrapper = secondaryTree || root !== path && !childAncestorPath;

        var parentPath = path.parentPath;

        var explicitReturn = parentPath.isReturnStatement();
        var implicitReturn = parentPath.isArrowFunctionExpression();

        var openingElement = (0, _elementOpenCall2.default)(path.get("openingElement"), this);
        var closingElement = (0, _elementCloseCall2.default)(path.get("openingElement"), this);
        var children = (0, _buildChildren2.default)(path.get("children"), this);

        var elements = [openingElement].concat(_toConsumableArray(children));
        if (closingElement) {
          elements.push(closingElement);
        }

        // Expressions Containers must contain an expression and not statements.
        // This will be flattened out into statements later.
        if (!needsWrapper && parentPath.isJSX()) {
          var sequence = t.sequenceExpression(elements);
          // Mark this sequence as a JSX Element so we can avoid an unnecessary
          // renderArbitrary call.
          replacedElements.add(sequence);
          path.replaceWith(sequence);
          return;
        }

        if (explicitReturn || implicitReturn || needsWrapper) {
          // Transform (recursively) any sequence expressions into a series of
          // statements.
          elements = (0, _flattenExpressions2.default)(elements);

          // Ensure the last statement returns the DOM element.
          elements = (0, _statementsWithReturnLast2.default)(elements);
        }

        if (needsWrapper) {
          // Create a wrapper around our element, and mark it as a one so later
          // child expressions can identify and "render" it.
          var closureVars = closureVarsStack.pop();
          var params = closureVars.map(function (e) {
            return e.id;
          });
          var wrapper = t.functionExpression(null, params, t.blockStatement(elements));

          if (hoist) {
            wrapper = (0, _hoist.addHoistedDeclarator)(path.scope, "wrapper", wrapper, this);
          }

          var args = [wrapper];
          if (closureVars.length) {
            var paramArgs = closureVars.map(function (e) {
              return e.init;
            });
            args.push(t.arrayExpression(paramArgs));
          }

          var wrapperCall = (0, _toFunctionCall2.default)((0, _jsxWrapper2.default)(this), args);
          replacedElements.add(wrapperCall);
          path.replaceWith(wrapperCall);
          return;
        }

        if (childAncestorPath) {
          replacedElements.add(childAncestorPath.node);
        }

        // This is the main JSX element. Replace the return statement
        // with all the nested calls, returning the main JSX element.
        if (explicitReturn) {
          parentPath.replaceWithMultiple(elements);
        } else {
          path.replaceWithMultiple(elements);
        }
      }
    }
  };

  var rootElementVisitor = {
    JSXElement: function JSXElement(path) {
      var previousRoot = this.root;
      var sameLevel = !previousRoot || previousRoot.getFunctionParent() === path.getFunctionParent();

      if (sameLevel && (0, _isRootJsx2.default)(path)) {
        this.root = path;
        var state = Object.assign({}, this, {
          secondaryTree: !(0, _isReturned2.default)(path)
        });

        traverse(path, elementVisitor, state);
        return;
      }

      this.elements++;
      path.skip();
    }
  };

  // This visitor first finds the root element, and ignores all the others.
  return {
    inherits: _babelPluginSyntaxJsx2.default,

    visitor: {
      Program: {
        enter: function enter(path) {
          if (this.opts.inlineExpressions) {
            path.traverse(_inlineExpressions2.default);
          }
          (0, _inject.setupInjector)(this);
          (0, _hoist.setupHoists)(this);
        },
        exit: function exit(path) {
          path.traverse(elementVisitor, {
            secondaryTree: true,
            root: null,
            replacedElements: new Set(),
            closureVarsStack: [],
            file: this.file,
            opts: this.opts
          });

          (0, _hoist.hoist)(path, this);
          (0, _inject.injectHelpers)(this);
        }
      },

      Function: {
        exit: function exit(path) {
          var state = {
            elements: 0,
            secondaryTree: false,
            root: null,
            replacedElements: new Set(),
            closureVarsStack: [],
            file: this.file,
            opts: this.opts
          };

          path.traverse(rootElementVisitor, state);

          if (state.elements > 0 && state.root) {
            state.secondaryTree = true;
            path.traverse(elementVisitor, state);
          }
        }
      }
    }
  };
};

var _isRootJsx = require("./helpers/is-root-jsx");

var _isRootJsx2 = _interopRequireDefault(_isRootJsx);

var _isReturned = require("./helpers/is-returned");

var _isReturned2 = _interopRequireDefault(_isReturned);

var _isChildElement = require("./helpers/is-child-element");

var _isChildElement2 = _interopRequireDefault(_isChildElement);

var _inject = require("./helpers/inject");

var _hoist = require("./helpers/hoist");

var _extractExpressions = require("./helpers/extract-expressions");

var _extractExpressions2 = _interopRequireDefault(_extractExpressions);

var _inlineExpressions = require("./helpers/inline-expressions");

var _inlineExpressions2 = _interopRequireDefault(_inlineExpressions);

var _jsxWrapper = require("./helpers/runtime/jsx-wrapper");

var _jsxWrapper2 = _interopRequireDefault(_jsxWrapper);

var _toFunctionCall = require("./helpers/ast/to-function-call");

var _toFunctionCall2 = _interopRequireDefault(_toFunctionCall);

var _flattenExpressions = require("./helpers/ast/flatten-expressions");

var _flattenExpressions2 = _interopRequireDefault(_flattenExpressions);

var _statementsWithReturnLast = require("./helpers/ast/statements-with-return-last");

var _statementsWithReturnLast2 = _interopRequireDefault(_statementsWithReturnLast);

var _elementOpenCall = require("./helpers/element-open-call");

var _elementOpenCall2 = _interopRequireDefault(_elementOpenCall);

var _elementCloseCall = require("./helpers/element-close-call");

var _elementCloseCall2 = _interopRequireDefault(_elementCloseCall);

var _buildChildren = require("./helpers/build-children");

var _buildChildren2 = _interopRequireDefault(_buildChildren);

var _babelPluginSyntaxJsx = require("babel-plugin-syntax-jsx");

var _babelPluginSyntaxJsx2 = _interopRequireDefault(_babelPluginSyntaxJsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }