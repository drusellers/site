var path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: 'production',
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
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: [
        'file-loader'
      ]
    }]
  }
};