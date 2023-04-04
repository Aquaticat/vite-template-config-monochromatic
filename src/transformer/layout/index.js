import { parseHTML } from 'linkedom';
import potentialId from '../helpers/potential-id/index.js';

import uniqueId from '../helpers/unique-id/index.js';

import setVariables from './html/setVariables.js';

import wrapWith from './helpers/wrapWith.js';

import insertHeader from './header/insertHeader.js';


const layout = (file, variables, extractedTitleFromFileName = '') => {
  const {
    window, document, customElements,
    HTMLElement,
    Event, CustomEvent,
  } = parseHTML(file);

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
    const h2SectionH2 = h2Section.querySelector(':scope > h2');

    h2Section.id = uniqueId(document, potentialId(h2SectionH2));
  });

  wrapWith(document, 'section', 'h3', '> wrapper-block > section:has(> h2):has(> h3)');

  [...document.body.querySelectorAll(':scope > wrapper-block > section:has(> h2) > section:has(h3)')].forEach((h3Section) => {
    const h3SectionH3 = h3Section.querySelector(':scope > h3');

    h3Section.id = uniqueId(document, potentialId(h3SectionH3));
  });

  wrapWith(document, 'section', 'h4', '> wrapper-block > section:has(>h2) > section:has(> h3):has(> h4)');

  [...document.body.querySelectorAll(':scope > wrapper-block > section:has(> h2) > section:has(h3) > section:has(> h4)')].forEach((h4Section) => {
    const h4SectionH4 = h4Section.querySelector(':scope > h4');

    h4Section.id = uniqueId(document, potentialId(h4SectionH4));
  });

  wrapWith(document, 'section', 'h5', '> wrapper-block > section:has(>h2) > section:has(> h3) > section:has(> h4):has(> h5)');

  [...document.body.querySelectorAll(':scope > wrapper-block > section:has(> h2) > section:has(h3) > section:has(> h4) > section:has(> h5)')].forEach((h5Section) => {
    const h5SectionH5 = h5Section.querySelector(':scope > h5');

    h5Section.id = uniqueId(document, potentialId(h5SectionH5));
  });

  wrapWith(document, 'section', 'h6', '> wrapper-block > section:has(>h2) > section:has(> h3) > section:has(> h4) > section:has(> h5):has(> h6)');

  [...document.body.querySelectorAll(':scope > wrapper-block > section:has(> h2) > section:has(h3) > section:has(> h4) > section:has(> h5) > section:has(> h6)')].forEach((h6Section) => {
    const h6SectionH6 = h6Section.querySelector(':scope > h6');

    h6Section.id = uniqueId(document, potentialId(h6SectionH6));
  });

  //endregion

  wrapWith(document, 'article', 'wrapper-block');

  wrapWith(document, 'main');

  insertHeader(document, extractedTitleFromFileName);

  // console.log(document.body.querySelectorAll(':scope > article:has(> h2)'));

  document.body.querySelectorAll(':scope > article')
    .forEach((article) => {
      article.innerHTML = `
${article.innerHTML}

${article.querySelector('h2')
    ? `
<aside>
<h1>
In this article:
</h1>

<ol>
<!-- TODO: Add section wrappers first! Because we are only selecting child elements in queryselector. -->
${article.querySelectorAll('h2')
    .reduce((html2, h2) => `
${html2}
<li>
<a href="#${h2.id || ''}">${h2.textContent}</a>

${h2.querySelector('h3')
    ? `
<ol>
${h2.querySelectorAll('h3')
    .reduce((html3, h3) => `
${html3}
<li>
<a href="#${h3.id || ''}">${h3.textContent}</a>
</li>
`, '')}
</ol>
`
    : ''}
</li>
`, '')}
</ol>
</aside>
 `
    : ''
}
`;
    });

  //endregion

  return document.toString();
};

export default layout;
