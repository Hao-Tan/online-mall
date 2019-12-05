const path = require("path")

module.exports = {
    outputDir: "dist",
    assetsDir: "public",
    devServer: {
         //代理
        proxy: 'http://localhost:3000'
    },
    configureWebpack: {
        resolve: {
            alias: {
                assets: path.join(__dirname, "src/assets"),
                components: path.join(__dirname, "src/components"),
                views: path.join(__dirname, "src/views")
            }
        }
    }
}
