// noinspection JSUnusedGlobalSymbols

import {
  defineConfig,
} from 'vite';

import {
  readFileSync,
  writeFileSync,
} from 'fs';

import {
  parse,
} from 'node-html-parser';

process.env['BROWSER'] = 'C:\\Program Files\\Google\\Chrome Dev\\Application\\chrome.exe';

export const fixHtmlHead = (): {
  closeBundle: () => void;
  name: string;
} => ({
  name: 'vite-plugin-fixHtmlHead',
  closeBundle: () => {
    const html = parse(readFileSync('dist/intermediate/assets/index.html', {
      encoding: 'utf-8',
    }));

    html
      .querySelector('[src="/index.js"]')!
      .removeAttribute('crossorigin');
    html
      .querySelector('[href="/style.css"]')!
      .setAttribute('blocking', 'render');

    writeFileSync('dist/intermediate/assets/index.html', html.toString());
  },
});

export default defineConfig({
  //region Shared Options
  root: 'src/link',
  css: {
    preprocessorOptions: {
      scss: {
        outputStyle: 'expanded',
      },
    },
  },
  esbuild: {
    minifyIdentifiers: false,
    minifySyntax: false,
  },
  clearScreen: false,
  //endregion

  //region Server Options
  server: {
    host: true,
    strictPort: true,
    open: 'index.html',
    fs: {
      strict: false,
      allow: [
        'index.html',
        'index.css',
        'index.mjs',
        'index.js',
        'index.mts',
        'index.ts',
      ],
    },
  },
  //endregion

  //region Build Options
  build: {
    minify: 'terser',
    terserOptions: {
      ecma: 2020,
      compress: false,
      mangle: false,
      module: true,
      format: {
        indent_level: 2,
        keep_numbers: true,
        keep_quoted_props: true,
        quote_style: 3,
      },
      keep_classnames: true,
      keep_fnames: true,
    },
    cssMinify: false,

    target: 'esnext',
    modulePreload: false,

    emptyOutDir: false,
    outDir: '../../dist/intermediate/assets',
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  //endregion

  //region Preview Options
  preview: {
    host: true,
    strictPort: true,
    open: 'index.html',
  },
  //endregion

  //region Dep Optimization Options
  optimizeDeps: {
    entries: ['index.html'],
    force: true,
  },
  //endregion

  //region Plugins
  plugins: [
    {
      ...fixHtmlHead(),
      enforce: 'post',
      apply: 'build',
    },
  ],
  //endregion
});
