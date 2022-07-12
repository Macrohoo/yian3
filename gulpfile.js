const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const alias = require('gulp-path-alias');
const gulpCopy = require('gulp-copy');
const path = require('path')
const rimraf = require('rimraf');
const cwd = process.cwd();
const esConfigFunction = require('./tools/getEsConfig');
const cjsConfigfunction = require('./tools/getCjsConfig')


const tsFiles = ['src/**/*.ts', 'src/**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts'];

gulp.task('tsc-es', () => {
    rimraf.sync(path.join(cwd, 'es'));
    return gulp.src(tsFiles)
    .pipe(sourcemaps.init({loadMaps: true}))    //To load existing source maps
    .pipe(alias({
      paths: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './typings')
      }
    }))
    .pipe(ts(esConfigFunction()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('es'))
  }
);

gulp.task('es-copy', () => {
  return gulp.src(["./src/icons/imgJson.json"])
  .pipe(gulpCopy("es", { prefix: 1 }))
});

gulp.task('tsc-cjs', () => {
  rimraf.sync(path.join(cwd, 'lib'));
  return gulp.src(tsFiles)
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(alias({
    paths: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './typings')
    }
  }))
  .pipe(ts(cjsConfigfunction()))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('lib'));
  }
);

gulp.task('cjs-copy', () => {
  return gulp.src(["./src/icons/imgJson.json"])
  .pipe(gulpCopy("lib", { prefix: 1 }))
});

const sass = require('gulp-sass')(require('sass'));

gulp.task('build-style', () => {
  return gulp.src('src/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist'));
})


const gulpBase64 = require("gulp-to-base64")
gulp.task('img-base64' , function(){
  return gulp.src("src/icons/*.{png,jpg,jpeg,mp3,svg,ttf}")
    .pipe(gulpBase64({
        size: false,  // false by default  , if true , write the width height
        outPath:"src/icons/imgJson.json"
    }))
});
