const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { join, resolve } = require('path');

const webpackConfig = {
  context: __dirname, // to automatically find tsconfig.json
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      }
    ]
  },
  devtool: 'source-map',
};

module.exports = webpackConfig;
