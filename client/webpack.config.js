const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    //Include workbox as a plugin
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'PWA-text-editor'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js',
      }),
      //plugin settings for manifest
      new WebpackPwaManifest({
        name: 'PWA-text-editor',
        short_name: 'PWS-txt-ed',
        description: 'Write and edit text/code snippets',
        background_color: '',
        theme_color: '',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    //CSS loaders and babel added to webpack
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
