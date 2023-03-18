// noinspection JSUnusedGlobalSymbols

import { readFileSync, writeFileSync } from 'fs';

import { parse } from 'node-html-parser';

process.env.BROWSER = 'C:\\Program Files\\Google\\Chrome Dev\\Application\\chrome.exe';

export const fixHtmlHead = () => {
  return {
    name: 'vite-plugin-fixHtmlHead',
    closeBundle: async () => {
      await (() => {
        const html = parse(readFileSync('docs/index.html', { encoding: 'utf-8' }));

        html
          .querySelector('[src="/assets/index.js"]')
          .removeAttribute('crossorigin');
        html
          .querySelector('[href="/assets/style.css"]')
          .setAttribute('blocking', 'render');

        writeFileSync('docs/index.html', html.toString());
      })();
    },
  };
};

export default {
  //region Shared Options
  root: 'src',
  css: {
    preprocessorOptions: {
      scss: {
        OutputStyle: 'expanded',
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
    target: 'esnext',
    modulePreload: false,

    emptyOutDir: false,
    outDir: '../dist',
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
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
};
