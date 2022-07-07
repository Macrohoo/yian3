const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const alias = require('gulp-path-alias');
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
  .pipe(gulp.dest('es'));
  }
);

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

const sass = require('gulp-sass')(require('sass'));

gulp.task('build-style', () => {
  return gulp.src('src/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist'));
})
