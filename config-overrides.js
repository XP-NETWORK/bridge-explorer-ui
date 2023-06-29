const webpack = require("webpack");

module.exports = function override(webpackConfig) {
    webpackConfig.resolve.fallback = {
        fs: false,
        os: false,
        util: require.resolve("util"),
    };

    webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        })
    );

    return webpackConfig;
};
