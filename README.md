Gulp Strip Block
================

Gulp module to remove a block of code marked by comments with a special tag.

This is useful if you want to add some helpful checks to development builds, but not to production builds.

Example:
--------

In your client js:

```javascript

var makeFoo(bar, baz) {
    // The following code will be stripped with our gulp task
    /* develblock:start */
    if (bar instanceof Bar !== true) {
        throw new Error('makeFoo: bar param is required and must be instance of Bar');
    }
    /* develblock:end */

    // This code would remain
    return new Foo(bar, baz);
}

```

In your Gulpfile:

```javascript
var gutil = require('gulp-util');
var stripBlock = require('gulp-strip-block');

gulp.task('javascript', function () {
    gulp.src('/src/js')
        .pipe(gutil.env.type === 'production' ? stripBlock() : gutil.noop())
        .pipe('/public/js');
});

```

Options
-------
* startComment: The text inside the /* */ block comment used to mark the beginning of the code block to be removed
* endComment: The text inside the /* */ used to mark the end of the code block to be removed