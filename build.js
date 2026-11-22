const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('Starting build...');
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

  // 1. Build bundle
  await esbuild.build({
    entryPoints: ['src/main.js'],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'dist/bundle.js',
  });
  console.log('✔ dist/bundle.js created');

  // 2. Copy and adapt index.html for dist
  let html = fs.readFileSync('index.html', 'utf8');
  // Make sure bundle path works whether served from root or dist
  const distHtml = html.replace('src="dist/bundle.js"', 'src="./bundle.js"');
  fs.writeFileSync(path.join('dist', 'index.html'), distHtml, 'utf8');
  console.log('✔ dist/index.html created');

  // 3. Copy styles.css
  fs.copyFileSync('styles.css', path.join('dist', 'styles.css'));
  console.log('✔ dist/styles.css created');

  // 4. Copy assets directory
  if (fs.existsSync('assets')) {
    fs.cpSync('assets', path.join('dist', 'assets'), { recursive: true });
    console.log('✔ dist/assets copied');
  }

  // 5. Copy preview-render.png if exists
  if (fs.existsSync('preview-render.png')) {
    fs.copyFileSync('preview-render.png', path.join('dist', 'preview-render.png'));
  }

  console.log('🎉 Build fully ready in dist/ folder!');
}

run().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
