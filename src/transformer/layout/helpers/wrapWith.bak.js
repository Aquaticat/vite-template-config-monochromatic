/* FIXME: Do not wrap with wrapper at the start.
          Right, maybe I should just do a check: if there is no separator, then just skip this
          No, that won't work, that way I cannot just wrap something.
          Okay, I think I got it:
          If the separator is specified but not found, then just skip this.
          If the separator is specified and found, then do it normally, but do not wrap what is above the first separator.
          If the separator is unspecified, do not skip the process of wrapping. */

/**
 * @param {Document} document
 *
 * @param {string} wrapperTagName
 *
 * @param {string} separatorTagName
 *
 *                 Defaults to an empty string
 *                 (means no separated wrapping separated by separator)
 *                 if this parameter is not provided or is an empty string.
 *
 * @param {string} parentSelectors
 *
 *                 Defaults to an empty string (means <body>)
 *                 if this parameter is not provided or is an empty string.
 *                 Scoped to `document.body`, so don't include 'body' at the start!
 *                 To target direct children of body (first), include '>' at the start.
 */
const wrapWith = (document, wrapperTagName, separatorTagName = '', parentSelectors = '') => {
  /* console.debug('\n\nwrapWith\n', (parentSelectors
                                      ? [...document.body.querySelectorAll(`:scope ${parentSelectors}`)]
                                      : [document.body])); */

  (parentSelectors
    ? [...document.body.querySelectorAll(`:scope ${parentSelectors}`)]
    : [document.body])
    .forEach((parentElement) => {
      parentElement.innerHTML = [...parentElement.querySelectorAll(':scope > *')].reduce((html, htmlElement) => {
        const trimmedHtml = html.trim();

        console.warn(trimmedHtml, htmlElement.localName);

        if (trimmedHtml) {
          if (htmlElement.localName === wrapperTagName) {
            if (trimmedHtml.endsWith(`</${wrapperTagName}>`)) {
              return `
${trimmedHtml}
${htmlElement.outerHTML}
`;
            }

            return `
${trimmedHtml}
</${wrapperTagName}>

${htmlElement.outerHTML}
`;
          }

          if (htmlElement.localName === separatorTagName) {
            if (trimmedHtml.endsWith(`</${wrapperTagName}>`)) {
              return `
${trimmedHtml}
<${wrapperTagName}>
${htmlElement.outerHTML}
`;
            }

            return `
${trimmedHtml}
</${wrapperTagName}>

<${wrapperTagName}>
${htmlElement.outerHTML}
`;
          }

          return `
${trimmedHtml}
${htmlElement.outerHTML}
`;
        }

        if (htmlElement.localName === wrapperTagName) {
          return htmlElement.outerHTML;
        }

        // What if I remove <${wrapperTagName}>?
        return `
<${wrapperTagName}>
${htmlElement.outerHTML}
`;
      }, '');

      // And this.
      if (!parentElement.innerHTML.endsWith(`</${wrapperTagName}>`)) {
        parentElement.innerHTML = `
${parentElement.innerHTML}
</${wrapperTagName}>
`;
      }
    });
};

export default wrapWith;
