import path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

export enum Mode {
  development = "development",
  production = "production",
}

const rootDir = path.resolve(__dirname, "..");
const dir = {
  root: rootDir,
  src: path.resolve(rootDir, "src"),
  lib: path.resolve(rootDir, "lib"),
  dist: path.resolve(rootDir, "dist"),
};

const common = (mode: Mode): webpack.Configuration => {
  const isDev = mode === Mode.development;
  return {
    mode: "production",
    devtool: isDev ? "inline-source-map" : undefined,
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css", ".sass", ".scss"],
      alias: {
        "@components": path.resolve(dir.src, "components"),
        "@assets": path.resolve(dir.src, "assets"),
        "@data": path.resolve(dir.src, "data"),
      },
    },
    entry: {
      index: path.resolve(dir.src, "index"),
    },
    output: {
      path: dir.dist,
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ["babel-loader", "ts-loader", "eslint-loader"],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            {
              loader: "style-loader",
            },
            // {
            // loader: "@teamsupercell/typings-for-css-modules-loader",
            // options: {
            // formatter: "prettier",
            // },
            // },
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: "[path][name]__[local]--[hash:base64:5]",
                  exportLocalsConvention: "camelCase",
                },
              },
            },
            { loader: "sass-loader" },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          loader: "url-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "StogaCS",
      }),
    ],
    node: {
      fs: "empty",
      cluster: "empty",
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
    },
    performance: {
      hints: isDev ? false : "warning",
      maxAssetSize: 500000,
      maxEntrypointSize: 500000,
    },
    devServer: {
      contentBase: dir.dist,
    },
  };
};

export default common;
