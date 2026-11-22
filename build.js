const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function run() {
  console.log('Building project for root, public, and dist...');

  // Ensure directories exist
  ['public', 'dist'].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // 1. Build bundle.js to root
  await esbuild.build({
    entryPoints: ['src/main.js'],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'bundle.js',
  });
  console.log('✔ bundle.js compiled (root)');

  // Copy bundle.js to public and dist
  fs.copyFileSync('bundle.js', path.join('public', 'bundle.js'));
  fs.copyFileSync('bundle.js', path.join('dist', 'bundle.js'));
  console.log('✔ bundle.js copied to public/ and dist/');

  // 2. Prepare index.html with clean relative script
  let html = fs.readFileSync('index.html', 'utf8');
  html = html.replace(/src=["'][^"']*bundle\.js["']/g, 'src="./bundle.js"');
  fs.writeFileSync('index.html', html, 'utf8');
  fs.writeFileSync(path.join('public', 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join('dist', 'index.html'), html, 'utf8');
  console.log('✔ index.html synchronized in root, public/, and dist/');

  // 3. Synchronize styles.css
  fs.copyFileSync('styles.css', path.join('public', 'styles.css'));
  fs.copyFileSync('styles.css', path.join('dist', 'styles.css'));
  console.log('✔ styles.css synchronized');

  // 4. Synchronize assets
  copyRecursive('assets', path.join('public', 'assets'));
  copyRecursive('assets', path.join('dist', 'assets'));
  console.log('✔ assets synchronized');

  console.log('🎉 Full build ready everywhere!');
}

run().catch((err) => {
  console.error('Build error:', err);
  process.exit(1);
});
