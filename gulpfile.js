const gulp = require('gulp');
const {series, parallel, watch} = require('gulp');
const sync = require('browser-sync').create();

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
    gulp.watch("*.html").on('change', sync.reload);
});


gulp.task('default', parallel(
    'server'
));