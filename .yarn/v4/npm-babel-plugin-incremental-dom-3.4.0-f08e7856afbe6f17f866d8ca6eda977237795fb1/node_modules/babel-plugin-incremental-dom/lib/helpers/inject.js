"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupInjector = setupInjector;
exports.injectHelpers = injectHelpers;
exports.default = inject;

var _toReference = require("./ast/to-reference");

var _toReference2 = _interopRequireDefault(_toReference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespace = "incremental-dom-helpers";

function getHelperRef(_ref, helper) {
  var file = _ref.file;
  var opts = _ref.opts;

  var runtime = opts.runtime;
  if (runtime) {
    return (0, _toReference2.default)(runtime + "." + helper);
  }

  var injectedHelper = file.get(namespace)[helper];
  return injectedHelper ? injectedHelper.ref : null;
}

function setHelper(_ref2, helper, value) {
  var file = _ref2.file;

  return file.get(namespace)[helper] = value;
}

// Sets up the needed data maps for injecting runtime helpers.
function setupInjector(_ref3) {
  var file = _ref3.file;

  // A map to store helper variable references
  // for each file
  file.set(namespace, Object.create(null));
}

function injectHelpers(_ref4) {
  var file = _ref4.file;

  var injectedHelpers = file.get(namespace);

  for (var helper in injectedHelpers) {
    var _injectedHelpers$help = injectedHelpers[helper];
    var ref = _injectedHelpers$help.ref;
    var expression = _injectedHelpers$help.expression;

    file.scope.push({
      id: ref,
      init: expression,
      unique: true
    });
  }
}

// Injects a helper function defined by helperAstFn into the current file at
// the top scope.
function inject(plugin, helper, helperAstFn) {
  var dependencyInjectors = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  var ref = getHelperRef(plugin, helper);
  if (ref) {
    return ref;
  }

  ref = plugin.file.scope.generateUidIdentifier(helper);
  var expression = null;

  var injectedHelper = { ref: ref, expression: expression };
  setHelper(plugin, helper, injectedHelper);

  var dependencyRefs = {};

  for (var dependency in dependencyInjectors) {
    var dependencyRef = getHelperRef(plugin, dependency);

    if (!dependencyRef) {
      dependencyRef = dependencyInjectors[dependency](plugin);
    }

    dependencyRefs[dependency] = dependencyRef;
  }

  injectedHelper.expression = helperAstFn(plugin, injectedHelper.ref, dependencyRefs);

  return ref;
}