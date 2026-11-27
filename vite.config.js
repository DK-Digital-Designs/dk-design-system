import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// ponytail: glob the two html dirs instead of hand-listing entries — new style page = new file, no config edit
const entries = { main: resolve(__dirname, 'index.html') };
for (const f of fs.readdirSync(resolve(__dirname, 'styles'))) {
  if (f.endsWith('.html')) entries[f.replace('.html', '')] = resolve(__dirname, 'styles', f);
}

export default defineConfig({
  base: './', // relative assets, so GitHub Pages subpaths work with no extra config
  // ponytail: docs/ as publicDir ships the markdown with the site verbatim, so the hub's
  // reference links work in dev and on Pages without a copy step.
  publicDir: 'docs',
  build: { outDir: 'dist', rollupOptions: { input: entries } },
  server: { open: true },
});
