const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('NODE_ENV: ', process.env.NODE_ENV)

module.exports = {
  entry: './client/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build',
  },

  mode: process.env.NODE_ENV,

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, 'client/public/index.html'),
      inject: false,
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'client/public/'),
    },
    compress: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Compiles Sass to CSS
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
