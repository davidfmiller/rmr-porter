
const
    path = require('path'),
    webpack = require('webpack'),
    terser = require('terser-webpack-plugin');

const config = {
  entry: './src/scripts/build.js',
  output: {
    path: path.resolve(__dirname, 'docs/build/'),
    filename: 'rmr-porter.bundle.js'
  },
  mode: 'production',
  watch: true,
  plugins : [
//     new terser({
//       extractComments: false,
//       test: /\.js(\?.*)?$/i
//     })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015']
            ]
          }
        }]
      }
    ]
  }
};

module.exports = config;
