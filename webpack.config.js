const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
        template: './src/index.html'
    })
  ],
  module: {
    rules: [
        {
            test: /.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }
    ],
  },
  
  devServer: {
    port: 8080,
    hot: true,
    static: {
        directory: './dist',
        publicPath: '/'
    },
    proxy: {
        '/api/**': {
            target: 'http://localhost:3001',
            secure: false
        }
    }
  },
  resolve: {
     extensions: ['.js', '.jsx']
  }
}