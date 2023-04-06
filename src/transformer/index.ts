import fs from 'fs';

import path from 'path';

import shell from 'shelljs';

import closestPath from './helpers/closest-path/index.ts';

import getVariables from './layout/html/getVariables.ts';

import render from './render/index.ts';

import layout from './layout/index.ts';

import jsBeautify from 'js-beautify';

const { html: beautifyHtml } = jsBeautify;

const ROOT_DIR = closestPath();

const CONTENT_FILE_NAMES_WITH_EXTENSIONS = fs.readdirSync(path.join(ROOT_DIR, 'content'))
  .filter((contentFileNameWithExtension) =>
    contentFileNameWithExtension.split('.')
      .at(-1)
      !== 'toml' && contentFileNameWithExtension.split('.').at(1)
  );

console.log(CONTENT_FILE_NAMES_WITH_EXTENSIONS);

CONTENT_FILE_NAMES_WITH_EXTENSIONS.forEach((contentFileNameWithExtension) => {
  const contentFileNamesWithExtensionSplits = contentFileNameWithExtension
    .split('.');

  const contentFileName = contentFileNamesWithExtensionSplits.slice(0, -1)
    .join('.');
  const contentFileExtension = contentFileNamesWithExtensionSplits.at(-1)!;

  fs.writeFileSync(
    path.join(ROOT_DIR, 'dist', 'intermediate', 'render', `${contentFileName}.html`),
    render(
      fs.readFileSync(path.join(ROOT_DIR, 'content', contentFileNameWithExtension), { encoding: 'utf8' }),
      contentFileExtension,
    ),
  );

  const VARIABLES = getVariables(contentFileName);

  fs.writeFileSync(
    path.join(ROOT_DIR, 'dist', 'intermediate', 'layout', `${contentFileName}.html`),
    layout(
      fs.readFileSync(path.join(ROOT_DIR, 'dist', 'intermediate', 'render', `${contentFileName}.html`), {
        encoding: 'utf8',
      }),
      VARIABLES,
      contentFileName.split('_')
        .join(' '),
    ),
  );

  fs.writeFileSync(
    path.join(ROOT_DIR, 'dist', 'intermediate', 'beautifiedHtml', `${contentFileName}.html`),
    beautifyHtml(
      fs.readFileSync(path.join(ROOT_DIR, 'dist', 'intermediate', 'layout', `${contentFileName}.html`), {
        encoding: 'utf8',
      }),
      {
        indent_size: 2,
        end_with_newline: true,
        preserve_newlines: false,
        wrap_attributes: 'force-expand-multiline',
        extra_liners: [
          'head',
          'body',
          '/html',
          'li',
          'p',
          'ol',
          'ul',
          'article',
          'section',
        ],
        templating: ['none'],
      },
    ),
  );

  shell.exec(
    `pnpm exec html-minifier-terser --case-sensitive --collapse-whitespace --conservative-collapse --decode-entities --keep-closing-slash --preserve-line-breaks -o ${
      path.join(ROOT_DIR, 'dist', 'intermediate', 'minifiedHtml', `${contentFileName}.html`)
    } ${path.join(ROOT_DIR, 'dist', 'intermediate', 'beautifiedHtml', `${contentFileName}.html`)}`,
  );
});
