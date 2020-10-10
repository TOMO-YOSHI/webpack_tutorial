const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: "./src/index.js",
  entry: {
    'hello-world': './src/hello-world.js',
    'school': './src/school.js'
  },
  output: {
    // filename: "bundle.js",
    // [contenthash] is for browser caching
    // Dont't need browser cash in DEVELOPMENT MODE
    // filename: "bundle.[contenthash].js",
    // filename: "bundle.js",

    // Following is for multi page app
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/",
    // If using HtmlWebpackPlugin, publicPath should be ""
    publicPath: "",
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    index: 'index.html',
    port: 9000
  },
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
        use: ["style-loader", "css-loader"],
        // use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        // use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
    // TerserPlugin is to make the bundle.js smaller.
    // **** DON'T need minify files in DEVELOPMENT ****
    // new TerserPlugin(),

    // MiniCssExtractPlugin is to make separated css bundle from bundle.js. Need to change rules as well.
    // **** DON'T need minify css in DEVELOPMENT ****
    // new MiniCssExtractPlugin({
    //   filename: "style.css",
    //   filename: "style.[contenthash].css",
    // }),

    // Each time when we run build, inside of the path directory will be cleaned up
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        // Cleaning up build folder
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
    // new HtmlWebpackPlugin({
    //   title: "Hello world",
    //   template: "src/index.hbs",
    //   description: "Some description",
    // }),
    new HtmlWebpackPlugin({
      filename: 'hello-world.html',
      chunks: ['hello-world'],
      title: "Hello world",
      template: "src/page-template.hbs",
      description: "Hello world",
      // filename: 'subfolder/custom_filename.html',
      // meta: {
      //     description: 'Some description'
      // }
    }),
    new HtmlWebpackPlugin({
      filename: 'school.html',
      chunks: ['school'],
      title: "School",
      template: "src/page-template.hbs",
      description: "School",
    }),
  ],
};