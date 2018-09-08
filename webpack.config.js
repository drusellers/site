var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/dru.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'js/dru.bundle.js'
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