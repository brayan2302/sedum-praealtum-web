const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('Building project...');
  
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

  // 1. Compile bundle.js to BOTH root and dist/
  await esbuild.build({
    entryPoints: ['src/main.js'],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'bundle.js',
  });
  fs.copyFileSync('bundle.js', path.join('dist', 'bundle.js'));
  console.log('✔ bundle.js generated at root and dist/');

  // 2. Ensure index.html references ./bundle.js directly
  let html = fs.readFileSync('index.html', 'utf8');
  if (html.includes('src="dist/bundle.js"')) {
    html = html.replace('src="dist/bundle.js"', 'src="./bundle.js"');
    fs.writeFileSync('index.html', html, 'utf8');
  }
  fs.writeFileSync(path.join('dist', 'index.html'), html, 'utf8');
  console.log('✔ index.html updated at root and dist/');

  // 3. Ensure styles.css is at root and dist/
  fs.copyFileSync('styles.css', path.join('dist', 'styles.css'));

  // 4. Copy assets directory
  if (fs.existsSync('assets')) {
    fs.cpSync('assets', path.join('dist', 'assets'), { recursive: true });
  }

  console.log('✔ Build completed successfully!');
}

run().catch((err) => {
  console.error('Build error:', err);
  process.exit(1);
});
