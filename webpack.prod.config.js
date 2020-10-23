const webpack = require('webpack');
var config = require("./webpack.config.js");
var { mergeWithCustomize, unique } = require("webpack-merge");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let prod = {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js',
  },
  plugins: [new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }],
      }
    }),
    // used to compress and extract the css
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chuckFilename: "[id].css"
    })
  ]
};


const prodConfig = mergeWithCustomize({
  customizeArray: unique(
    'plugins',
    ['MiniCssExtractPlugin'],
    plugin => plugin.constructor && plugin.constructor.name
  )
})(config, prod);

module.exports = prodConfig;
