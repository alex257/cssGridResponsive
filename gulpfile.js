const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

const sassOptions = {
  outputStyle: "expanded"
};


// compile scss into css
var DEST = './src/css/';

function style() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch("src/scss/**/*.scss", style);
  gulp.watch("src/*.html").on("change", browserSync.reload);
  //gulp.watch("./js/**/*.js", browserSync.reload);
}

exports.style = style;
exports.watch = watch;

const build = gulp.parallel(
  style,
  watch
);

gulp.task(build);
gulp.task("default", build);
