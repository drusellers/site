var path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/dru.js',
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/images',
      to: 'images'
    }]),
    // keep the output dir clean
    new CleanWebpackPlugin(),
    // connect the hashed ids to hugo
    new ManifestPlugin({
      // used to read in the file path in hugo template
      fileName: '../data/manifest.json'
    }),
    // used to compress and extract the css
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chuckFilename: "[id].css"
    }),
    new Dotenv({
      systemvars: true
    })
  ],
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'js/[name].js'
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
