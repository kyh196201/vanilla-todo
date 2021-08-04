const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    // https://code.visualstudio.com/docs/languages/jsconfig#_using-webpack-aliases
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      Components: path.resolve(__dirname, 'src/js/components/'),
      Store: path.resolve(__dirname, 'src/js/store/'),
      Api: path.resolve(__dirname, 'src/js/api/'),
      Utils: path.resolve(__dirname, 'src/js/utils/'),
      Core: path.resolve(__dirname, 'src/js/core/'),
      Config: path.resolve(__dirname, 'src/js/config/'),
      Lib: path.resolve(__dirname, 'src/js/lib/'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    writeToDisk: true,
    port: 9000,
    open: true,
    hot: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
              @import './_variables.scss';
            `,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.m?js$/i,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['last 2 versions', 'ie >= 11'],
                  },
                },
              ],
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties'],
              ['@babel/plugin-transform-runtime', {corejs: 3}],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('http://localhost:3000/'),
    }),
  ],
};
