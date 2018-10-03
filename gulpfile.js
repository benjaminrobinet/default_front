let gulp = require('gulp');
var webserver = require('gulp-webserver');

let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let livereload = require('gulp-livereload');
let autoprefixer = require('gulp-autoprefixer');


gulp.task('default', ['sass', 'sass:watch', 'auto-prefixer', 'auto-prefixer:watch', 'serve']);

gulp.task('serve', function () {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            directoryListing: {
                enable: true,
                path: 'app',
            },
            open: 'index.html',
        }));
});

gulp.task('sass', function () {
    return gulp.src('./dev/assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/static/css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./dev/assets/scss/**/*.scss', ['sass']);
});

gulp.task('auto-prefixer', function () {
    gulp.src('./app/static/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('./app/static/css/'))
});

gulp.task('auto-prefixer:watch', function () {
    gulp.watch('./app/static/css/**/*.css', ['auto-prefixer'])
});