var gulp = require('gulp');
var each = require('gulp-each');
var fc2json = require('gulp-file-contents-to-json');

var vfsBefore = "this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = ";
var vfsAfter = ";";

gulp.task('buildFonts', function () {
	return gulp.src(['./src/assets/fonts/**/*.*'])
		.pipe(each(function (content, file, callback) {
			var newContent = new Buffer(content).toString('base64');
			callback(null, newContent);
		}, 'buffer'))
		.pipe(fc2json('vfs_fonts.js', {flat: true}))
		.pipe(each(function (content, file, callback) {
			var newContent = vfsBefore + content + vfsAfter;
			callback(null, newContent);
		}, 'buffer'))
		.pipe(gulp.dest('src'));
});