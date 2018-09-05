var gulp = require('gulp');
var each = require('gulp-each');
var fc2json = require('gulp-file-contents-to-json');
var through = require('through2');
var PluginError = require('plugin-error');
var Vinyl = require('vinyl');
var KebabCase = require('kebab-case');

var vfsBefore = "this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = ";
var vfsAfter = ";";

gulp.task('buildFonts', function () {
  return gulp.src(['./src/assets/fonts/**/*.*'])
    .pipe(each(function (content, file, callback) {
      var newContent = new Buffer(content).toString('base64');
      callback(null, newContent);
    }, 'buffer'))
    .pipe(fc2json('vfs_fonts.js', {
      flat: true
    }))
    .pipe(each(function (content, file, callback) {
      var newContent = vfsBefore + content + vfsAfter;
      callback(null, newContent);
    }, 'buffer'))
    .pipe(gulp.dest('src'));
});

gulp.task('i18n-split', function () {
  return gulp.src(['./src/assets/i18n/*.json'])
    .pipe(
      i18nSplit()
    )
    .pipe(gulp.dest('src/assets/i18n'));
});

var i18nSplit = function () {
  return through.obj(function (file, encoding, callback) {
    if (file.isBuffer()) {
      var basename = file.path.substring(file.path.lastIndexOf('\\') + 1);
      var locale = basename.substring(0, basename.indexOf('.'));
      var data = JSON.parse(file.contents);
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var translations = data[key];
          var translationFile = new Vinyl();
          translationFile.path = './' + KebabCase(key) + '/' + locale + '.json';
          translationFile.contents = Buffer.from(
            JSON.stringify({
                [key]: translations
              },
              null,
              "\t"
            ));
          this.push(translationFile);
        }
      }
    }
    callback();
  });
}
