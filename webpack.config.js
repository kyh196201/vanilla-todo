const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

dotenv.config();

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';
  let projectTitle = '';

  if (isDevelopment) {
    projectTitle = 'Development';
  } else if (isProduction) {
    projectTitle = 'vanilla-todo-app';
  }

  return {
    // mode: 'development',
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
        title: projectTitle,
        template: './index.html',
        filename: 'index.html',
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
        FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        FIREBASE_STORAGE_BUCKET: JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET,
        ),
        FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID,
        ),
        FIREBASE_APP_ID: JSON.stringify(process.env.FIREBASE_APP_ID),
        FIREBASE_MEASUREMENT_ID: JSON.stringify(
          process.env.FIREBASE_MEASUREMENT_ID,
        ),
      }),
    ],
  };
};
