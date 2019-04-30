/**
 * @fileoverview Arrow Functions within a CallExpression should be on their own
 * line for readability
 * @author Chema Balsas
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Arrow Functions inside CallExpressions should be on their own line",
            category: "Stylistic Issues",
            recommended: false
        },
        fixable: "code",
        schema: [
            {
                enum: ["always", "never", "any"]
            }
        ]
    },

    create: function(context) {
        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

        const options = context.options[0] || "any";

        return {
            ArrowFunctionExpression(node) {
                const start = node.loc.start.line;
                const parentType = node.parent.type;
                const parentStart = node.parent.loc.start.line;
                const arrowCondition = (start === parentStart || node.start < node.parent.callee.end + 4);

                if (options === "always") {
                    if (parentType === "CallExpression" && arrowCondition) {
                        context.report({
                            node: node,
                            message: "Arrow Functions inside CallExpressions should be on their own line",
                            fix: function(fixer) {
                                return [
                                    fixer.insertTextBefore(node, "\n"),
                                    fixer.insertTextAfter(node, "\n")
                                ];
                            }
                        });
                    }
                } else if (options === "never") {
                    if (parentType === "CallExpression" && !arrowCondition) {
                        context.report({
                            node: node,
                            message: "Arrow Functions inside CallExpressions should be on their own line"
                        });
                    }
                }
            }
        };
    }
};
