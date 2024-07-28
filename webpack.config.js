const path = require('path');

module.exports = {
  entry: './src/app.js', // Adjust this path to your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Add other loaders as needed (e.g., for CSS, images)
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
};
