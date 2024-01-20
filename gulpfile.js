import gulp from "gulp"
import dartSass from "sass"
import gulpSass from "gulp-sass"
import autoPrefixer from "gulp-autoprefixer"
import concat from "gulp-concat"
import { deleteAsync } from "del"
import browserSync from "browser-sync"
import fileinclude from "gulp-file-include"
import imagemin from "gulp-imagemin"
import imageminGifsicle from "imagemin-gifsicle"
import imageminMozjpeg from "imagemin-mozjpeg"
import imageminOptipng from "imagemin-optipng"
import imageminSvgo from "imagemin-svgo"
import babel from "gulp-babel"
import webpack from "webpack-stream"
import fonter from "gulp-fonter"
import ttf2woff2 from "gulp-ttf2woff2"

import { config } from "./webpack.config.js"

export const isDev = process.env.NODE_ENV === "development"

const sass = gulpSass(dartSass)

const cleanDist = () => deleteAsync("dist")

const liveReload = async () => {
    if (!isDev) {
        return null
    }

    browserSync.init({
        server: {
            baseDir: "dist"
        },
	open: false
    })
}

const html = () => {
    if (isDev) {
        return gulp.src("src/*.html")
            .pipe(fileinclude({
                prefix: "@@",
                basepath: "@file"
            }))
            .pipe(gulp.dest("dist"))
            .pipe(browserSync.reload({ stream: true }))
    }

    return gulp.src("src/*.html")
            .pipe(fileinclude({
                prefix: "@@",
                basepath: "@file"
            }))
            .pipe(gulp.dest("dist"))
}

const styles = () => {
    if (isDev) {
        return gulp.src([
            "src/assets/scss/lib/**/*.css",
            "src/assets/scss/*.scss"
        ], { sourcemaps: true })
            .pipe(sass())
            .pipe(concat("style.min.css"))
            .pipe(gulp.dest("dist/assets/css", { sourcemaps: true }))
            .pipe(browserSync.reload({ stream: true }))
    }

    return gulp.src([
        "src/assets/scss/lib/**/*.css",
        "src/assets/scss/*.scss"
    ])
        .pipe(concat("style.min.css"))
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(autoPrefixer({ cascade: false }))
        .pipe(gulp.dest("dist/assets/css"))
}

const scripts = async () => {
    await deleteAsync("dist/assets/js")

    if (isDev) {
        return gulp.src("src/assets/js/index.js")
            .pipe(webpack(config))
            .pipe(gulp.dest("dist/assets/js"))
            .pipe(browserSync.reload({ stream: true }))
    }

    return gulp.src("src/assets/js/index.js")
            .pipe(babel())
            .pipe(webpack(config))
            .pipe(gulp.dest("dist/assets/js"))
}

const images = async () => {
    await deleteAsync("dist/assets/images")

    if (isDev) {
        return gulp.src("src/assets/images/**/*")
            .pipe(gulp.dest("dist/assets/images"))
            // .pipe(browserSync.reload({ stream: true }))  // REMOVE IF USE MORE THAN 48 IMAGES
    }

    return gulp.src("src/assets/images/**/*")
        .pipe(imagemin([
            imageminGifsicle({ interlaced: true }),
            imageminMozjpeg({ quality: 80, progressive: true }),
            imageminOptipng({ optimizationLevel: 5 }),
            imageminSvgo({
                plugins: [
                    { name: "removeViewBox", active: true },
                    { name: "cleanupIDs", active: false }
                ]
            })
        ]))
        .pipe(gulp.dest("dist/assets/images"))
}

const iconfonts = () => {
    return gulp.src("src/assets/iconfonts/**/*")
        .pipe(gulp.dest("dist/assets/iconfonts"))
        .pipe(browserSync.reload({ stream: true }))
}

export const fontsOtf2Woff = () => {
    return gulp.src("src/assets/fonts/**/*.otf")
        .pipe(fonter({
            formats: ["woff"]
        }))
        .pipe(gulp.dest("dist/assets/fonts"))
        .pipe(browserSync.reload({ stream: true }))
}

export const fontsTtf2Woff2 = () => {
    return gulp.src("src/assets/fonts/**/*.ttf")
        .pipe(ttf2woff2())
        .pipe(gulp.dest("dist/assets/fonts"))
        .pipe(browserSync.reload({ stream: true }))
}

const fonts = () => {
    fontsOtf2Woff()
    fontsTtf2Woff2()

    return gulp.src([
        "src/assets/fonts/**/*.woff",
        "src/assets/fonts/**/*.woff2"
    ])
        .pipe(gulp.dest("dist/assets/fonts"))
        .pipe(browserSync.reload({ stream: true }))
}

const watching = async () => {
    if (!isDev) {
        return null
    }

    gulp.watch("src/**/*.html", html)
    gulp.watch([
        "src/assets/scss/**/*.scss",
        "src/assets/scss/lib/**/*"
    ], styles)
    gulp.watch("src/assets/js/**/*", scripts)
    gulp.watch("src/assets/fonts/**/*", fonts)
    gulp.watch("src/assets/iconfonts/**/*", iconfonts)
    gulp.watch("src/assets/images/**/*", images)
}

export const build = gulp.series(
    cleanDist,
    gulp.parallel(html, styles, scripts, images, fonts, iconfonts),
    gulp.parallel(watching, liveReload)
)



