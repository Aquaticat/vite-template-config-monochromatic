import fs from 'fs';

import path from 'path';

import * as TOML from '@ltd/j-toml';

import shell from 'shelljs';

import closestPath from './helpers/closest-path/index.js';

import render from './render/index.js';

import layout from './layout/index.js';


const rootDir = closestPath();

const contentFileNamesWithExtensions = fs.readdirSync(path.join(rootDir, 'content'))
  .filter((contentFileNameWithExtension) => contentFileNameWithExtension.split('.')
    .at(-1)
                                                                                   !== 'toml');

console.log(contentFileNamesWithExtensions);

contentFileNamesWithExtensions.forEach((contentFileNameWithExtension) => {
  const contentFileNamesWithExtensionSplits = contentFileNameWithExtension.split('.');

  const contentFileName = contentFileNamesWithExtensionSplits.slice(0, -1)
    .join('.');
  const contentFileExtension = contentFileNamesWithExtensionSplits.at(-1);


  fs.writeFileSync(path.join(rootDir, 'dist', 'intermediate', 'render', contentFileNameWithExtension),

                   render(fs.readFileSync(path.join(rootDir, 'content', contentFileNameWithExtension),
                                          { encoding: 'utf8' }), contentFileExtension));

  fs.writeFileSync(path.join(rootDir, 'dist', 'intermediate', 'layout', contentFileNameWithExtension),
                   layout(fs.readFileSync(path.join(rootDir,
                                                    'dist',
                                                    'intermediate',
                                                    'render',
                                                    contentFileNameWithExtension),
                                          { encoding: 'utf8' }),

                          TOML.parse(fs.existsSync(path.join(rootDir, 'dist', 'intermediate', 'render', '.toml'))
                            ? fs.readFileSync(path.join(rootDir, 'dist', 'intermediate', 'render', '.toml'),
                                              { encoding: 'utf8' })
                            : ''),

                          contentFileName.split('_')
                            .join(' ')));

  shell.exec(`pnpm exec html-minifier-terser --case-sensitive --collapse-whitespace --conservative-collapse --decode-entities --keep-closing-slash --preserve-line-breaks -o ${path.join(rootDir,
                                                                                                                                                                                         'dist',
                                                                                                                                                                                         'intermediate',
                                                                                                                                                                                         'minifiedHtml',
                                                                                                                                                                                         contentFileNameWithExtension)} ${path.join(rootDir,
                                                                                                                                                                                                                                    'dist',
                                                                                                                                                                                                                                    'intermediate',
                                                                                                                                                                                                                                    'layout',
                                                                                                                                                                                                                                    contentFileNameWithExtension)}`,
             () => {
             });

  shell.exec('pnpm exec vite build', () => {});


});
