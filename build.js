const { build } = require('esbuild');
const { nodeBuiltIns } = require('esbuild-node-builtins');
const rimraf = require('rimraf');

const clean = async () => {
  return new Promise((resolve) => {
    rimraf('./dist', () => resolve());
  });
};

const runBuild = async (doClean = false) => {
  // Do not clean each time on watch, only on build or first run.
  if (doClean) await clean();

  // Build to browser js
  build({
    plugins: [nodeBuiltIns()],
    entryPoints: ['./src/browser.ts'],
    minify: false,
    bundle: true,
    platform: 'browser',
    target: ['es2019'],
    outfile: './dist/index.js',
    format: 'esm',
    sourcemap: 'inline',
    define: {
      'process.env.NODE_DEBUG': false,
      'process.env.NODE_ENV': 'production',
      'process.env.DEBUG': false,
      global: 'window',
      'process.cwd': 'String',
      '_smartweave_1.LoggerFactory.INST': '{"create": "function() {}"}',
      '_warp_1.LoggerFactory.INST': '{"create": "function() {}"}',
      __filename: 'String',
    },
  }).catch((e) => {
    console.log(e);
    process.exit(1);
  });

  // Minified version
  build({
    plugins: [nodeBuiltIns()],
    entryPoints: ['./src/browser.ts'],
    minify: true,
    bundle: true,
    platform: 'browser',
    target: ['es2019'],
    outfile: './dist/index.min.js',
    sourcemap: 'inline',
    define: {
      'process.env.NODE_DEBUG': false,
      'process.env.NODE_ENV': 'production',
      'process.env.DEBUG': false,
      global: 'window',
      'process.cwd': 'String',
      '_smartweave_1.LoggerFactory.INST': '{"create": "function() {}"}',
      '_warp_1.LoggerFactory.INST': '{"create": "function() {}"}',
      __filename: 'String',
    },
  }).catch((e) => {
    console.log(e);
    process.exit(1);
  });

  // Build to frontend frameworks
  build({
    plugins: [nodeBuiltIns()],
    entryPoints: ['./src/index.ts'],
    minify: false,
    bundle: true,
    platform: 'browser',
    target: ['es2019'],
    format: 'esm', // to allow import support
    splitting: true,
    outdir: './web',
    sourcemap: 'external',
    define: {
      'process.env.NODE_DEBUG': 'false',
      'process.env.NODE_ENV': 'production',
      'process.env.DEBUG': 'false',
      global: 'window',
      'process.cwd': 'String',
      '_smartweave_1.LoggerFactory.INST': '{"create": "function() {}"}',
      __filename: 'String',
    },
  }).catch((e) => {
    console.log(e);
    process.exit(1);
  });
};
runBuild(true);

module.exports = runBuild;
