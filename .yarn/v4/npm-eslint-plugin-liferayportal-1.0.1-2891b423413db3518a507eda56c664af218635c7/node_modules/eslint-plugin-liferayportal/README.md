# eslint-plugin-liferayportal

Liferay Portal ESLint Plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-liferayportal`:

```
$ npm install eslint-plugin-liferayportal --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-liferayportal` globally.

## Usage

Add `liferayportal` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "liferayportal"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "liferayportal/rule-name": 2
    }
}
```

## Supported Rules

* arrowfunction-newline





