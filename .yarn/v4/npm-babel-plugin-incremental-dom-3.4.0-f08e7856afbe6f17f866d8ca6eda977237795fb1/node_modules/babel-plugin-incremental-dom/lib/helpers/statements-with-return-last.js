// Ensures the final statement is a return statement.
"use strict";

exports.__esModule = true;
exports["default"] = statementsWithReturnLast;

function statementsWithReturnLast(t, statements) {
  var lastIndex = statements.length - 1;
  var last = statements[lastIndex];

  if (!t.isReturnStatement(last)) {
    statements[lastIndex] = t.returnStatement(last.expression);
  }

  return statements;
}

module.exports = exports["default"];