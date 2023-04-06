const path = require("path"); // = import path from "path"(CommonJS)

// 자동으로 html에 script 파일 추가
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");

// APP Key 환경 변수로 관리하기
dotenv.config();

// process.env.NODE_ENV(노드 환경 변수): 운영체제 레벨에서 관리해야 하는 변수
const isProduction = process.env.NODE_ENV === "production";

// export default
module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "../build"), // __dirname: 현재 폴더의 경로, (기준, 이동)
    filename: "static/js/[name].[contenthash:8].js", // name: entry.name(default: "main")
    clean: true,
  },
  devtool: isProduction ? false : "eval-source-map",
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    client: {
      overlay: true,
      progress: true,
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/, // .js, .jsx 확장자 파일만 loader 사용
            exclude: /node_modules/, // node_modules 내 파일 제외
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.css$/i, // .css 확장자 파일만 loader 사용
            exclude: /node_modules/, // node_modules 내 파일 제외
            use: [
              isProduction ? MiniCssExtractPlugin.loader : "style-loader",
              "css-loader",
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    isProduction
      ? new HtmlWebpackPlugin({
          template: "public/index.html",
          minify: true,
        })
      : new HtmlWebpackPlugin({
          template: "public/index.html",
        }),
    isProduction
      ? new MiniCssExtractPlugin({
          linkType: false,
          filename: "[name].[contenthash].css",
        })
      : undefined,
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ].filter(Boolean),
};
