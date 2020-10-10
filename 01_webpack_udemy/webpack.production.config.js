const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: "./src/index.js",
  entry: {
    "hello-world": "./src/hello-world.js",
    school: "./src/school.js",
  },
  output: {
    // filename: "bundle.js",
    // [contenthash] is for browser caching
    // filename: "bundle.[contenthash].js",
    // following is for multi page web app
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/",
    // If using HtmlWebpackPlugin, publicPath should be ""
    publicPath: "",
  },
  mode: "production",

  // following is needed when "lodash" is installed
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      automaticNameDelimiter: '_'
    },
  },
  // **********************************************

  module: {
    rules: [
      // {
      //     test: /\.(xml)$/,
      //     use: [
      //         'xml-loader'
      //     ]
      // },
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        // use: ["style-loader", "css-loader", "sass-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["transform-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    // TerserPlugin is to make the bundle.js smaller. This does not need to be inported in PRODUCTION MODE
    // new TerserPlugin(),

    // MiniCssExtractPlugin is to make separated css bundle from bundle.js. Need to change rules as well.
    new MiniCssExtractPlugin({
      //   filename: "style.css",
      // filename: "style.[contenthash].css",
      // following is for multi page
      filename: "[name].[contenthash].css",
    }),
    // Each time when we run build, inside of the path directory will be cleaned up
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        // Cleaning up build folder
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      // chunks: ["hello-world"],
      // following is needed when "lodash" is installed
      chunks: ["hello-world", "vendors~hello-world~school"],
      title: "Hello world",
      template: "src/page-template.hbs",
      description: "Hello world",
      // filename: 'subfolder/custom_filename.html',
      // meta: {
      //     description: 'Some description'
      // }
    }),

    // For building multi html page, it's needed to use HtmlWebpackPlugin again!
    new HtmlWebpackPlugin({
      filename: "school.html",
      chunks: ["school", "vendors~hello-world~school"],
      title: "School",
      template: "src/page-template.hbs",
      description: "School",
    }),
  ],
};