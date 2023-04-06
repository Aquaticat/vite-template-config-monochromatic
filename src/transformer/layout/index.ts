import {
  parseHTML,
} from 'linkedom';

import potentialId from '../helpers/potential-id/index.ts';

import uniqueId from '../helpers/unique-id/index.ts';

import setVariables from './html/setVariables.ts';

import wrapWith from './helpers/wrapWith.ts';

import insertHeader from './header/insertHeader.ts';

import insertFooter from './footer/insertFooter.ts';

import type Variables from './html/Variables.d.ts';

import insertNav from './nav/insertNav.ts';

const layout = (file: string, variables: Variables, extractedTitleFromFileName = ''): string => {
  const { document } = parseHTML(file);

  //region Side Effects

  setVariables(variables, document);

  wrapWith(document, 'wrapper-block', 'h1');

  //region Wrap Headings

  /* FIXME: This is bad.
            This does not take into account of the situation in which the h2 is already wrapped into section.
            Consider using a more advanced wrapWith function to automatically insert id to section,
            instead of doing it in another step.
            Also, doing it in another step would cause user-added section to be incorrectly handled.
            Update: It's not working as well.
            It somehow always wraps it twice each time.
             */
  wrapWith(document, 'section', 'h2', '> wrapper-block:has(> h2)');

  // TODO: Try to make this block reusable instead of specifying it 4 more times for h3, h4, h5, and h6.
  [...document.body.querySelectorAll(':scope > wrapper-block > section:has(> h2)')].forEach((h2Section) => {
    const h2SectionH2 = h2Section.querySelector(':scope > h2')! as HTMLHeadingElement;

    h2Section.id = uniqueId(document, potentialId(h2SectionH2));
  });

  wrapWith(document, 'section', 'h3', '> wrapper-block > section:has(> h2):has(> h3)');

  [...document.body.querySelectorAll(':scope > wrapper-block > section:has(> h2) > section:has(h3)')].forEach(
    (h3Section) => {
      const h3SectionH3 = h3Section.querySelector(':scope > h3')! as HTMLHeadingElement;

      h3Section.id = uniqueId(document, potentialId(h3SectionH3));
    },
  );

  wrapWith(document, 'section', 'h4', '> wrapper-block > section:has(>h2) > section:has(> h3):has(> h4)');

  [
    ...document.body.querySelectorAll(
      ':scope > wrapper-block > section:has(> h2) > section:has(h3) > section:has(> h4)',
    ),
  ].forEach((h4Section) => {
    const h4SectionH4 = h4Section.querySelector(':scope > h4')! as HTMLHeadingElement;

    h4Section.id = uniqueId(document, potentialId(h4SectionH4));
  });

  wrapWith(
    document,
    'section',
    'h5',
    '> wrapper-block > section:has(>h2) > section:has(> h3) > section:has(> h4):has(> h5)',
  );

  [
    ...document.body.querySelectorAll(
      ':scope > wrapper-block > section:has(> h2) > section:has(h3) > section:has(> h4) > section:has(> h5)',
    ),
  ].forEach((h5Section) => {
    const h5SectionH5 = h5Section.querySelector(':scope > h5')! as HTMLHeadingElement;

    h5Section.id = uniqueId(document, potentialId(h5SectionH5));
  });

  wrapWith(
    document,
    'section',
    'h6',
    '> wrapper-block > section:has(>h2) > section:has(> h3) > section:has(> h4) > section:has(> h5):has(> h6)',
  );

  [
    ...document.body.querySelectorAll(
      ':scope > wrapper-block > section:has(> h2) > section:has(h3) > section:has(> h4) > section:has(> h5) > section:has(> h6)',
    ),
  ].forEach((h6Section) => {
    const h6SectionH6 = h6Section.querySelector(':scope > h6')! as HTMLHeadingElement;

    h6Section.id = uniqueId(document, potentialId(h6SectionH6));
  });

  //endregion

  wrapWith(document, 'article', 'wrapper-block');

  document.querySelectorAll(':scope > article').forEach((article) => {
    article.id = uniqueId(document, potentialId(article.querySelector(':scope > wrapper-block > h1')!));
  })

  document.body.querySelectorAll(':scope > article:has(> wrapper-block > section > h2)')
    .forEach((article) => {
      article.innerHTML = `
${article.innerHTML}

<aside>
<h1>
In this article:
</h1>

<ol>
<!-- TODO: Add section wrappers first! Because we are only selecting child elements in queryselector.
           Done adding section wrapper. Now working on this. -->
${
        [...article.querySelectorAll(':scope > wrapper-block > section:has(h2)')]
          .reduce((html2, h2Section) => `
${html2}
<li>
<a href="#${h2Section.id}">${h2Section.querySelector(':scope > h2')!.textContent}</a>

${
            h2Section.querySelector(':scope > section:has(h3)')
              ? `
<ol>
${
                [...h2Section.querySelectorAll(':scope > section:has(h3)')]
                  .reduce((html3, h3Section) => `
${html3}
<li>
<a href="#${h3Section.id}">${h3Section.querySelector(':scope > h3')!.textContent}</a>
</li>
`, '')
              }
</ol>
`
              : ''
          }
</li>
`, '')
      }
</ol>
</aside>
`;
    });

  wrapWith(document, 'main');

  insertHeader(document, extractedTitleFromFileName);
  insertFooter(document);

  wrapWith(document, 'wrapper-block');

  insertNav(document);

  //endregion

  return [...document.children].map((documentChild) => documentChild.outerHTML)
    .join('');
};

export default layout;
