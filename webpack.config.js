const path = require('path');
const root_dir = __dirname;

console.log("Root Directory", root_dir);
module.exports = {
  entry: './src/server.js',
  output: {
    filename: 'build.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: {
    'express': 'commonjs express',
    'redis': 'commonjs redis'
  }
};