const { join, resolve } = require('path');

const webpackConfig = {
  mode: 'production',
  context: __dirname, // to automatically find tsconfig.json
  entry: './src/index.js',
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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      }
    ]
  },
  devtool: 'source-map'
};

module.exports = webpackConfig;
