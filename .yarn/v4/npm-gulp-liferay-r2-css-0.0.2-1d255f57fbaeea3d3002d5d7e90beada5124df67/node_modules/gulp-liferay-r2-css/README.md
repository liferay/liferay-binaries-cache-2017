# gulp-liferay-r2-css

gulp-liferay-r2-css is a thin wrapper for Liferay's fork of [R2](https://www.npmjs.com/package/R2), which helps you achieve cross-language layout-friendly websites (including bi-directional text).

## Install

```
$ npm i gulp-liferay-r2-css
```

## Use

```js
var gulp = require('gulp');
var r2 = require('gulp-liferay-r2-css');

gulp.src('left_to_right.css')
  .pipe(r2())
  .pipe(gulp.dest('right_to_left'))
```

## Test

```
$ npm test
```

## Issues

For issues related to specific changes that R2 applies to your css files, please report on the original [R2 repository](https://github.com/ded/R2/issues).

MIT