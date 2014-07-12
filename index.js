/*jslint node:true*/
"use strict";

var
    Transform = require('stream').Transform,
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;

/**
 * @constructor
 * @type {StripBlock}
 * @param {object} options
 */
function StripBlock(options) {

    options = options || {};

    this.startComment = options.startComment || 'develblock:start';

    this.endComment = options.endComment || 'develblock:end';

    this.regexPattern = new RegExp("[\\t ]*\\/\\* ?" + this.startComment + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + this.endComment + " ?\\*\\/[\\t ]*\\n?", "g");

}

/**
 * Recieved entry file, pass through a file with
 * all code in the comment tags removed.
 * @param {File} srcFile A vinyl file.
 * @param {string} encoding Encoding (ignored).
 * @param {function(Error, File)} done Callback.
 */
StripBlock.prototype._transform = function (srcFile, encoding, done) {
    if (!srcFile || !srcFile.contents instanceof Buffer) {
        done(new PluginError('gulp-strip-block', 'Expected a source file with a contents Buffer'));
        return;
    }

    srcFile.contents = new Buffer(String(srcFile.contents).replace(this.regexPattern));

    this.push(srcFile);

    done();
};

/**
 * @param {function(Error)} done Callback.
 */
StripBlock.prototype._flush = function (done) {
    done();
};


module.exports = function (options) {
    return new StripBlock(options);
};