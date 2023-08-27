const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Your HTML template file
        chunks: ['main'], // Specify the entry chunk(s) to include in the HTML
      }),

      // Configure the WebpackPwaManifest plugin for generating the manifest file
      new WebpackPwaManifest({
        name: 'My PWA',
        short_name: 'PWA',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),

      // Configure the InjectManifest plugin for adding the service worker
      new InjectManifest({
        swSrc: './src/sw.js', // Path to your service worker source file
        exclude: [/\.map$/, /_redirects/], // Add exclusions if needed
      }),
    ],

    module: {
      rules: [
        // Add CSS loader rules here
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Add Babel loader rule here
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};