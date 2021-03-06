/**
 * Created by claudio on 09/09/16.
 */

/**
 * Created by claudio on 24/08/16.
 */
"use strict";
// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var MaterialIconsTranslator = require('./index');


// Consts
const PLUGIN_NAME = 'material-icons-translator';

// Plugin level function(dealing with files)
function gulpMaterialIconsTranslator(simple, debug) {
    simple = simple===false?false:true;
    var MaterialIconsTranslatorCustom =  simple?MaterialIconsTranslator.simple:MaterialIconsTranslator.complex;
    // Creating a stream through which each file will pass
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }
        if (file.isBuffer()) {
            try {
                file.contents = new Buffer(MaterialIconsTranslatorCustom(file.contents.toString('utf-8'), debug));
                return cb(null, file);
            }catch(err)
            {
                return cb(new PluginError(PLUGIN_NAME, err));
            }
        }
        if (file.isStream()) {
            return cb(new PluginError(PLUGIN_NAME, 'Not yet supported'));//file.contents = StreamFromPromise();
        }
    });

}

// Exporting the plugin main function
module.exports = gulpMaterialIconsTranslator;