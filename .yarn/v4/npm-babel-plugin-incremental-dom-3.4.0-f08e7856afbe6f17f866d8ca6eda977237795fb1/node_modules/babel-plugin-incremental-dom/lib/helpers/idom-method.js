"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = iDOMMethod;

var _toReference = require("./ast/to-reference");

var _toReference2 = _interopRequireDefault(_toReference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a reference to an iDOM method.
function iDOMMethod(method, _ref) {
  var opts = _ref.opts;
  var file = _ref.file;

  var prefix = opts.prefix || "";
  if (prefix) {
    return (0, _toReference2.default)(prefix + "." + method);
  }

  var binding = file.scope.getBinding(method);
  if (binding) {
    return binding.identifier;
  }

  return (0, _toReference2.default)(method);
}