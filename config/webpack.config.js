const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const openBrowser = require('react-dev-utils/openBrowser');

const mode = process.env.NODE_ENV;
const port = 3000;

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  mode,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'auto',
    clean: true, // cleans the output folder (dist) at the start of the build process
  },
  devServer: {
    onAfterSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('Webpack-dev-server is not defined. Did you forget to install it as a dependency?');
      }
      /*
              This function comes from Create React app and uses the `openChrome.applescript` file in this config directory
              so that if there is already a chrome tab pointing to `http://localhost:${port}` then webpack devServer will
              reuse that tab, rather than opening a new browser tab every time webpack deserver starts.
              
              Do NOT remove this unless you want to make local dev 15% more annoying by opening new chrome tabs every time
              you run `npm start` :)
            */
      openBrowser(`http://localhost:${port}`);
    },
    historyApiFallback: true,
    hot: false,
    liveReload: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port,
    client: {
      overlay: false,
      logging: 'info',
    },
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    /* 
      If you dont force your SPA to resolve singletons (such as React) to the SPA's LOCAL node_modules,
      then you may experience issues when using `npm link`. When linked to another npm package 
      that also contains a copy of a singleton, webpack can try to load the other 
      library's installed copy of the singleton instead of the SPA's copy.
      the `alias` field of webpack forces webpack to resolve imports to a specific location,
      which is the local node_modules in this case.

      if you're experiencing issues loading shared deps when using npm link, try adding them to this alias section.
     */
    alias: {
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
      'react-redux': path.resolve(__dirname, '../node_modules/react-redux'),
      '@reduxjs/toolkit': path.resolve(__dirname, '../node_modules/@reduxjs/toolkit'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
