const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
const packageJsonDeps = require('./package.json').dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3003,
  },
  output: {
    publicPath: "auto",
  },
  experiments: { topLevelAwait: true },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "design_system_1_0_0",
      remotes: {
        design_system_1_0_0: "design_system_1_0_0@http://localhost:3002/web/remoteEntry.js",
      },
      shared: {
          react: {
              singleton: true,
              eager: true,
              requiredVersion: packageJsonDeps.react
        },
        "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: packageJsonDeps["react-dom"]
        }
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
