const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const { watch } = require('browser-sync');
const clean = require('gulp-clean');
const kit = require('gulp-kit');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const paths = {
    html: './html/**/*.kit',
    sass: './src/sass/**/*.scss',
    js: './src/js/**/*.js',
    img: './src/img/**/*',
    dist: './dist',
    sassDest: './dist/css',
    jsDest: './dist/js',
    imgDest: './dist/img',
}

function sassCompiler(done){
    gulp.src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({ 
            suffix: '.min' 
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.sassDest));

    done();
}

function javascript(done){
    gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({ 
            suffix: '.min' 
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.jsDest));
    done();
}

function convertImage(done){
    gulp.src(paths.img)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.imgDest));
    done();
}

function handleKits(done){
    gulp.src(paths.html)
        .pipe(kit())
        .pipe(gulp.dest('./'));
    done();
}



function cleanStuff(done){
    gulp.src(paths.dist, { read: false})
        .pipe(clean());
    done();
}

function startBrowserSync(done){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    done();
}

function watchForChanges(done){
    gulp.watch('./*.html').on("change", reload);
    gulp.watch([paths.sass, paths.js, paths.html], gulp.parallel(sassCompiler, javascript, handleKits)).on("change", reload);
    gulp.watch(paths.img, convertImage).on("change", reload);
    done();
}



const mainFunctions = gulp.parallel(handleKits, sassCompiler, javascript, convertImage);
exports.cleanStuff = cleanStuff;
exports.default = gulp.series(mainFunctions, startBrowserSync, watchForChanges);