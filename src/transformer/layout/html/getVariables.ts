import fs from 'fs';

import {
  parseHTML,
} from 'linkedom';

import path from 'path';

import closestPath from '../../helpers/closest-path/index.ts';

import * as TOML from '@ltd/j-toml';

import type Variables from './Variables';

const ROOT_DIR = closestPath();

const getVariables = (contentFileName: string): Variables => ({
  ...fs.existsSync(path.join(ROOT_DIR, 'content', '.toml'))
    ? TOML.parse(fs.readFileSync(path.join(ROOT_DIR, 'content', '.toml'), { encoding: 'utf8' }))
    : ({}),
  ...fs.existsSync(path.join(ROOT_DIR, 'content', `${contentFileName}.toml`))
    ? TOML.parse(fs.readFileSync(path.join(ROOT_DIR, 'content', `${contentFileName}.toml`)))
    : ({}),
  ...parseHTML(
      fs.readFileSync(
        path.join(ROOT_DIR, 'dist', 'intermediate', 'render', `${contentFileName}.html`),
        { encoding: 'utf8' },
      ),
    ).document.body.querySelector(':scope x-variables')
    ? TOML.parse(
      parseHTML(
        fs.readFileSync(
          path.join(ROOT_DIR, 'dist', 'intermediate', 'render', `${contentFileName}.html`),
          { encoding: 'utf8' },
        ),
      ).document.body.querySelector(':scope x-variables')!.innerHTML,
    )
    : ({}),
});

export default getVariables;
