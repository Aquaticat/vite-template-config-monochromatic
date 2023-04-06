import closestPath from '../../helpers/closest-path/index.ts';

import fs from 'fs';

import path from 'path';

import {
  parseHTML,
} from 'linkedom';

const ROOT_DIR = closestPath();

const insertNav = (document: Document): void => {
  document.body.innerHTML = `
<body>
<nav id="nav">
  <!-- Set it to open in JavaScript,
  because we don't want the navbar to be expanded on mobile devices without JavaScript. -->
  <details>
  <summary>
    <h1>
      <a href="/index.html/#title">Home</a>
    </h1>
  </summary>

  <wrapper-block>
  <a href="#title" id="Skip_to_content">Skip to content</a>

  <section id="nav__pages">
  <ul>
    ${
    (fs.readdirSync(path.join(ROOT_DIR, 'dist', 'intermediate', 'render'))
      .filter((renderedFileNameWithExtension) =>
        renderedFileNameWithExtension.split('.')
          .at(-1)
          === 'html'
      )
      .map((renderedFileNameWithExtension) =>
        renderedFileNameWithExtension
          .slice(0, -'.html'.length)
      )
      .map((renderedFileName) => `
<li>
<a href="/${renderedFileName}">${
        parseHTML(
          fs.readFileSync(path.join(ROOT_DIR, 'dist', 'intermediate', 'render', `${renderedFileName}.html`), {
            encoding: 'utf8',
          }),
        ).document.body.querySelector(':scope h1')?.textContent ?? renderedFileName.replaceAll('_', ' ')
      }</a>
</li>
`))
      .join('')
  }
  </ul>
  </section>

  ${
    document.body.querySelectorAll(':scope > wrapper-block > main > article').length === 1
      ? document.body.querySelectorAll(':scope > wrapper-block > main > article > section > h2').length <= 1
        ? ''
        : `
<section id="nav__h2>
<h2>
  On this page:
</h2>

<ol>
  ${
          [...document.body.querySelectorAll(':scope > wrapper-block > main > article > section:has(> h2)')].map((
            h2Section,
          ) => `
<li>
<a href="#${h2Section.id}">${h2Section.querySelector(':scope > h2')!.textContent}</a>
</li>
`).join('')
        }
</ol>
</section>
`
      : `
<section id="nav__articles>
<h2>
  On this page:
</h2>

<ol>
  ${
        [...document.body.querySelectorAll(':scope > wrapper-block > main > article')].map((article) => `
<li>
<a href="#${article.id}">${article.querySelector(':scope > wrapper-block > h1')!.textContent}</a>
</li>
`).join('\n\n')
      }
</ol>
</section>
`
  }

  <section id="Jump_to_footer">
  <a href="#footer">Jump to bottom</a>
  </section>
  </wrapper-block>
  </details>
</nav>

${document.body.innerHTML}
`;
};

export default insertNav;
