/*jslint node:true*/
"use strict";

var
    Transform = require('stream').Transform,
    fs = require('graceful-fs'),
    path = require('path'),
    util = require('util'),
    gutil = require('gulp-util'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    copy = require('shallow-copy'),
    gcolors = gutil.colors,
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
 * Remove references to buffered files.
 * @param {function(Error)} done Callback.
 */
StripBlock.prototype._flush = function (done) {
    done();
};


module.exports = function (options) {
    return new StripBlock(options);
};