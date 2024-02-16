const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const { dependencies } = require("./package.json");
const path = require("path");
const { config } = require('dotenv');
const { DefinePlugin } = require('webpack');


config();

module.exports = {
  entry: "./src/entry.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "auto",
  },
  mode: "development",
  devServer: {
    port: 3001,
    hot: true,
    static: {
      directory: path.join(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        Header_remote: "Header@http://localhost:3000/remoteEntry.js",
      },
    }),

    new DefinePlugin(
      Object.keys(process.env)
        .filter((key) => key.startsWith('WEBPACK_DEMO_'))
        .reduce(
          (result, key) => ({
            ...result,
            [`process.env.${key}`]: JSON.stringify(process.env[key])
          }),
          {}))

  ],
};
