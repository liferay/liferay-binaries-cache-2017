"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupHoists = setupHoists;
exports.hoist = hoist;
exports.addHoistedDeclarator = addHoistedDeclarator;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var namespace = "incremental-dom-hoists";

// Sets up the file to hoist all statics
function setupHoists(_ref) {
  var file = _ref.file;

  // A map to store helper variable references
  // for each file
  file.set(namespace, []);
}

function hoist(program, _ref2) {
  var file = _ref2.file;

  var hoists = file.get(namespace);

  if (hoists.length) {
    var declaration = t.variableDeclaration("const", hoists);
    program.unshiftContainer("body", declaration);
  }
}

// Hoists the variable to the top of the file.
function addHoistedDeclarator(scope, name, value, _ref3) {
  var file = _ref3.file;

  var ref = scope.generateUidIdentifier(name);
  var declarator = t.variableDeclarator(ref, value);
  file.get(namespace).push(declarator);

  return ref;
}