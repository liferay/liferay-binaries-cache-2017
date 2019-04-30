/**
 * @fileoverview Arrow Functions within a CallExpression should be on their own
 * line for readability
 * @author Chema Balsas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/arrowfunction-newline"),

    RuleTester = require("eslint").RuleTester;

    RuleTester.setDefaultConfig({
      parserOptions: {
        ecmaVersion: 6
      }
    });

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("arrowfuncion-newline", rule, {

    valid: [
        "foo(bar => baz)",
        {
            code: "foo(bar => baz)",
            options: ["never"]
        },
        {
            code: "foo(\nbar => baz\n)",
            options: ["always"]
        }
    ],

    invalid: [
        {
            code: "foo(bar => baz)",
            errors: [{
                message: "Arrow Functions inside CallExpressions should be on their own line",
                type: "ArrowFunctionExpression"
            }],
            options:  ["always"]
        },
        {
            code: "foo(\nbar => baz\n)",
            errors: [{
                message: "Arrow Functions inside CallExpressions should be on their own line",
                type: "ArrowFunctionExpression"
            }],
            options:  ["never"]
        }
    ]
});
