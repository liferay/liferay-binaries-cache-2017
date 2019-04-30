"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanText;
var nonWhitespace = /\S/;
var whitespace = /\s+/g;

// Cleans the whitespace from a text node.
function cleanText(value) {
  if (!nonWhitespace.test(value)) {
    return "";
  }

  return value.replace(whitespace, " ");
}