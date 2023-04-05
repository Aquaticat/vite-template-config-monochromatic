import fs from 'fs';

import path from 'path';

import * as TOML from '@ltd/j-toml';

import shell from 'shelljs';

import closestPath from './helpers/closest-path/index.ts';

import render from './render/index.ts';

import layout from './layout/index.ts';

const ROOT_DIR = closestPath();

const CONTENT_FILE_NAMES_WITH_EXTENSIONS = fs.readdirSync(path.join(ROOT_DIR, 'content'))
  .filter((contentFileNameWithExtension) =>
    contentFileNameWithExtension.split('.')
      .at(-1)
      !== 'toml'
  );

console.log(CONTENT_FILE_NAMES_WITH_EXTENSIONS);

CONTENT_FILE_NAMES_WITH_EXTENSIONS.forEach((contentFileNameWithExtension) => {
  const contentFileNamesWithExtensionSplits = contentFileNameWithExtension
    .split('.');

  const contentFileName = contentFileNamesWithExtensionSplits.slice(0, -1)
    .join('.');
  const contentFileExtension = contentFileNamesWithExtensionSplits.at(-1);

  fs.writeFileSync(
    path.join(ROOT_DIR, 'dist', 'intermediate', 'render', contentFileNameWithExtension),
    render(
      fs.readFileSync(path.join(ROOT_DIR, 'content', contentFileNameWithExtension), { encoding: 'utf8' }),
      contentFileExtension,
    ),
  );

  fs.writeFileSync(
    path.join(ROOT_DIR, 'dist', 'intermediate', 'layout', contentFileNameWithExtension),
    layout(
      fs.readFileSync(path.join(ROOT_DIR, 'dist', 'intermediate', 'render', contentFileNameWithExtension), {
        encoding: 'utf8',
      }),
      TOML.parse(
        fs.existsSync(path.join(ROOT_DIR, 'dist', 'intermediate', 'render', '.toml'))
          ? fs.readFileSync(path.join(ROOT_DIR, 'dist', 'intermediate', 'render', '.toml'), { encoding: 'utf8' })
          : '',
      ),
      contentFileName.split('_')
        .join(' '),
    ),
  );

  shell.exec(
    `pnpm exec html-minifier-terser --case-sensitive --collapse-whitespace --conservative-collapse --decode-entities --keep-closing-slash --preserve-line-breaks -o ${
      path.join(ROOT_DIR, 'dist', 'intermediate', 'minifiedHtml', contentFileNameWithExtension)
    } ${path.join(ROOT_DIR, 'dist', 'intermediate', 'layout', contentFileNameWithExtension)}`,
  );
});
