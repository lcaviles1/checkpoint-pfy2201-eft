import { build, context } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
await cp('public', 'dist', { recursive: true });
await cp('src/styles.css', 'dist/assets/styles.css');
await cp('node_modules/bootstrap/dist/css/bootstrap.min.css', 'dist/assets/bootstrap.min.css');
const licenses = await Promise.all(['react', 'react-dom', 'bootstrap'].map(async name =>
  `${name.toUpperCase()}\n${await readFile(`node_modules/${name}/LICENSE`, 'utf8')}`));
await writeFile('dist/assets/licenses.txt', licenses.join('\n\n'));
const options = {
  entryPoints: ['src/main.jsx'], outfile: 'dist/assets/app.js', bundle: true,
  format: 'iife', jsx: 'automatic', target: ['chrome100', 'firefox100', 'safari15'],
  minify: true, legalComments: 'linked', define: { 'process.env.NODE_ENV': '"production"' }
};
if (process.argv.includes('--serve')) {
  const ctx = await context(options);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: 'dist', host: '127.0.0.1', port: 5173 });
  console.log(`Checkpoint: http://127.0.0.1:${port}`);
  console.log('Los cambios en React se recompilan. Recarga el navegador para verlos.');
  console.log('Si modificas CSS, imágenes o HTML, reinicia npm run dev.');
} else {
  await build(options);
  console.log('Compilación completa en dist/. También funciona abriendo dist/index.html directamente.');
}
