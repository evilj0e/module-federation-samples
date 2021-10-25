const { ModuleFederationPlugin } = require("webpack").container;

const { NodeAsyncHttpRuntime } = require("@telenko/node-mf");
const path = require("path");
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/index.js",
  target: false,
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    path: path.resolve(__dirname, "dist", "node"),
    publicPath: "http://localhost:3002/node/",
    clean: true,
  },
  resolve: {
    extensions: [
      ".jsx",
      ".js",
      ".json",
      ".css",
      ".scss",
      ".jpg",
      "jpeg",
      "png",
    ],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: "url-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "design_system_1_0_0",
      filename: "remoteEntry.js",
      exposes: {
        './Typography': './src/Typography',
        './constants': './src/constants/index.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
        'styled-components': {
          singleton: true,
          requiredVersion: packageJson.dependencies['styled-components'],
        }
      },
    }),
    new NodeAsyncHttpRuntime(),
  ],
};
