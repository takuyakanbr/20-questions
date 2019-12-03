
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const globals = {
  'process.env.NODE_ENV': isProd ? JSON.stringify('production') : JSON.stringify('development'),
  __DEV__: !isProd,
};

let config = {
  devtool: 'source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  target: 'web',
  entry: isProd ? path.resolve(__dirname, 'src/index.js') : [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src/index.dev.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '' : 'http://localhost:28990/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: isProd ? 'babel-loader' : [
        'react-hot-loader/webpack',
        'babel-loader'
      ] },
      { test: /\.(jpe?g|png|gif|dat)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.(css|scss|sass)$/, use: isProd ?
        [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
          'sass-loader'
        ] : [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
          'sass-loader'
        ] },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};

if (isProd) {

  config.output.filename = '[name].[chunkhash].js';
  config.plugins = [
    new webpack.DefinePlugin(globals),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      favicon: 'src/static/favicon.png',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
  ];

} else {

  config.plugins = [
    new webpack.DefinePlugin(globals),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      favicon: 'src/static/favicon.png',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ];
  config.devServer = {
    port: 28990,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

}


module.exports = config;
