"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = statementsWithReturnLast;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Ensures the final statement is a return statement.
function statementsWithReturnLast(statements) {
  var lastIndex = statements.length - 1;
  var last = statements[lastIndex];

  if (!t.isReturnStatement(last)) {
    statements[lastIndex] = t.returnStatement(last.expression);
  }

  return statements;
}