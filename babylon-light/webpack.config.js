const path = require("path");

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist')
    },
    performance: {
      maxEntrypointSize: 1024000,
      maxAssetSize: 1024000
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    module: {
      rules: [
          {
              test: /\.tsx?$/,
              loader: "ts-loader",
              exclude: /node_modules/
          },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      hot: true
    }
}
