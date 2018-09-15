var path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/dru.js',
  plugins: [
    // keep the output dir clean
    new CleanWebpackPlugin(['static/js']),
    // improve the consistency of hashes on the output name
    new webpack.HashedModuleIdsPlugin(),
    // connect the hashed ids to hugo
    new ManifestPlugin({
      // used to read in the file path in hugo template
      fileName: '../data/manifest.json'
    }),
    // used to compress the css
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chuckFilename: "[id].css"
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }],
      }
    })
  ],
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'js/[name].[contenthash].js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          // this replaces the style-loader to
          // group the css into an outbound file
          // to avoid FOUC
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader'
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};