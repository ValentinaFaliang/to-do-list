const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const StylelintWebpackPlugin = require("stylelint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new EslintWebpackPlugin({
      files: "{**/*,*}.{tsx,ts,js}",
    }),
    new StylelintWebpackPlugin({
      files: "{**/*,*}.css",
    }),
  ],
  devServer: {
    open: {
      app: {
        name: "Google Chrome",
      },
    },
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
