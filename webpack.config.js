export const config = {
    mode: process.env.NODE_ENV,
    devtool: "source-map",
    entry: {
        index: "./src/assets/js/index.js"
    },
    output: {
        filename: "index.min.js"
    }
}