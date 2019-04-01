const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProduction ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require('autoprefixer')({}),
              ],
              sourceMap: !isProduction
            }
          },
          { loader: "sass-loader", options: { sourceMap: !isProduction} }
        ]
      },
    {
      test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: 'img/'
            }
          }
      ]
    },
    {
      test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "fonts/", 
        publicPath: "../fonts/"
      }
    }
    ]
    },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new RemovePlugin({
      /**
       * Before compilation removes entire `docs` folder.
       */
      before: {
        include: ['docs']
      },
    }),
  ],
};