const path = require('path');
const fs = require('fs');

class InjectStaticFilesPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('InjectStaticFilesPlugin', (compilation, callback) => {
      const staticDir = path.resolve(__dirname, 'static');
      const staticFiles = {};
      
      // Read all files from static directory
      const files = fs.readdirSync(staticDir);
      files.forEach(file => {
        const filePath = path.join(staticDir, file);
        if (fs.statSync(filePath).isFile()) {
          const content = fs.readFileSync(filePath, 'utf8');
          staticFiles[file] = content;
        }
      });
      
      // Inject static files into the worker
      const staticFilesJson = JSON.stringify(staticFiles);
      const mainAsset = compilation.assets['main.js'];
      const source = mainAsset.source();
      
      // Replace STATIC_FILES = {} with actual content
      const modifiedSource = source.replace(
        'const STATIC_FILES = {}',
        `const STATIC_FILES = ${staticFilesJson}`
      );
      
      compilation.assets['main.js'] = {
        source: () => modifiedSource,
        size: () => modifiedSource.length
      };
      
      callback();
    });
  }
}

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  target: 'webworker',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    chunkFormat: 'module',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new InjectStaticFilesPlugin()
  ],
  optimization: {
    minimize: false
  }
};
