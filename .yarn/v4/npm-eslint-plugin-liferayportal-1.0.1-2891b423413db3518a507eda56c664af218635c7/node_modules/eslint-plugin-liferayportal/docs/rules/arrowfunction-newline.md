# arrowfunction new line (arrowfunction-newline)

Arrow Functions within a CallExpression should be on their own line for readability

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

foo(bar => baz)

foo(bar => { return baz; })

```

Examples of **correct** code for this rule:

```js

foo(
    bar => baz
)

foo(
    bar => {
        return baz;
    }
)

```