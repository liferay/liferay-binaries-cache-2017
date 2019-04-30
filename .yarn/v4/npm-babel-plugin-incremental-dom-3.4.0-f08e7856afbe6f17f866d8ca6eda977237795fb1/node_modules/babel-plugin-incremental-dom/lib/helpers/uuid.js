"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uuid;

var _crypto = require("crypto");

// @jed's brilliantly short UUID v4 generator
// https://gist.github.com/jed/982883
function uuid() {
  return "00000000-0000-4000-8000-000000000000".replace(/[08]/g, randomizer);
}

function randomizer(bit) {
  return (bit ^ (0, _crypto.randomBytes)(1)[0] % 16 >> bit / 4).toString(16);
}