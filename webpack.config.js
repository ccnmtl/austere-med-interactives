const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules : [{
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }]
  },
  devServer: {
      inline: true,
      publicPath: './',
      contentBase: './',
      port: 3000,
      historyApiFallback: true,
      writeToDisk: true
  },
};
