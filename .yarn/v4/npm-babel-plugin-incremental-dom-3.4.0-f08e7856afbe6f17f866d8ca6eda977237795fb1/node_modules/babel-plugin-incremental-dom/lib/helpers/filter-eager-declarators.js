// Filters out empty children, and transform JSX expressions
// into function calls.
"use strict";

exports.__esModule = true;
exports["default"] = filterEagerDeclarators;

function filterEagerDeclarators(t, elements, eagerDeclarators) {
  return elements.filter(function (element) {
    if (t.isVariableDeclaration(element)) {
      eagerDeclarators.push.apply(eagerDeclarators, element.declarations);
      return false;
    } else {
      return true;
    }
  });
}

module.exports = exports["default"];