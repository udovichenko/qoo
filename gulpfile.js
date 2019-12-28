const gulp = require('gulp');
const {series, parallel, watch} = require('gulp');
const sync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('server', function(){
    sync.init({
        server: {
            baseDir: "./"
        },
        open: true,
        host: 'localhost',
        ghostMode: false
    });

    watch("src/*.js").on('change', sync.reload);
    watch("*.html").on('change', sync.reload);
});

function js(src) {
    if (src == null) {
        src = 'src/*.js';
    }

    if (typeof src == 'string') {
        src = src.replace(/\\/g, '/');
    }

    return gulp
        .src(src)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
}

gulp.task('js', () => {
    return js();
});

gulp.task('watch', () => {
    watch('src/*.js').on('change', (path) => {
        return js(path);
    });
});


gulp.task('default', parallel(
    'js',
    'server',
    'watch'
));