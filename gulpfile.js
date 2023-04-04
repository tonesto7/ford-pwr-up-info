const gulp = require("gulp");
const logger = require("gulplog");
// const babel = require("gulp-babel");
// const uglify = require("gulp-uglify");
// const rename = require("gulp-rename");
// const minify = require("gulp-minify");
// const lazypipe = require("lazypipe");
const cleanCss = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
// const autoprefixer = require("gulp-autoprefixer");
// const prefixCSS = require("gulp-prefix-css");
const htmlmin = require("gulp-htmlmin");
const gulpif = require("gulp-if");
const useref = require("gulp-useref");
const terser = require("gulp-terser");

const debonceDelay = 3000;

gulp.task("copy-fonts", async () => {
    gulp.src("node_modules/@fortawesome/fontawesome-free/webfonts/*").pipe(gulp.dest("public/webfonts"));
    gulp.src("node_modules/material-icons/iconfont/*.css").pipe(gulp.dest("public/css"));
    gulp.src("node_modules/material-icons/iconfont/*.woff").pipe(gulp.dest("public/css"));
    gulp.src("node_modules/material-icons/iconfont/*.woff2").pipe(gulp.dest("public/css"));
    gulp.src("node_modules/material-icons/iconfont/*.ttf").pipe(gulp.dest("public/css"));
    // gulp.src("src/web/css/dark.css").pipe(gulp.dest("public/css"));
    // gulp.src("src/web/css/theme-dark.css").pipe(gulp.dest("public/css"));
    return;
});

gulp.task("copy-imgs", async () => {
    gulp.src("src/web/img/**/*.*").pipe(gulp.dest("public/img"));
    gulp.src("src/web/icons/*.*").pipe(gulp.dest("public"));
    return;
});

gulp.task("copy-json", () => {
    return gulp.src("src/web/*.json").pipe(gulp.dest("public"));
});

gulp.task("clean-dist", async () => {
    const { deleteAsync } = await import("del");
    await deleteAsync(["dist/"]);
    await deleteAsync(["public/"]);
    return;
});

gulp.task("process-main-html", () => {
    return (
        gulp
            .src("src/web/index.html")
            .pipe(useref())
            .pipe(gulpif("*.html", htmlmin({ collapseWhitespace: true })))
            .pipe(gulpif("*.js", terser()))
            .pipe(gulpif("*.css", sourcemaps.init()))
            // .pipe(gulpif("theme-dark.css", prefixCSS(".dark")))
            .pipe(gulpif("*.css", sourcemaps.write("./")))
            .pipe(gulpif("*.css", cleanCss()))
            .pipe(gulp.dest("public"))
    );
});

gulp.task("process-template-html", () => {
    return gulp
        .src("src/web/templates/**/*.html")
        .pipe(gulpif("*.html", htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest("public/templates"));
});

gulp.task("process-content", gulp.series("clean-dist", gulp.parallel("process-main-html", "process-template-html", "copy-fonts", "copy-imgs", "copy-json")));

gulp.task("default", () => {
    logger.warn("Gulp is Watching for Files Changes...");
    // Watches for all JS, CSS, HTML, JSON files in the /src/web/ folders and subfolders
    gulp.watch(["src/web/js/**/*.js", "src/web/css/*.css", "src/web/templates/**/*.html", "src/web/*.html", "src/web/*.json"], { delay: 1000 }, gulp.series("process-content"));
});
