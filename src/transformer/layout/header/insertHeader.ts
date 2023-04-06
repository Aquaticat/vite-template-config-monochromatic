const insertHeader = (document: Document, extractedH1FromFileName: string): void => {
  document.body.innerHTML = `
<header>
<hgroup>
<h1>
${
    (() => {
      if (document.body.querySelectorAll(':scope h1').length === 1) {
        const extractedH1FromContent = document.body
          .querySelector(':scope h1')!
          .textContent!;

        document.body.querySelector(':scope h1')!
          .remove();

        return extractedH1FromContent
          || extractedH1FromFileName;
      }

      return extractedH1FromFileName;
    })()
  }
</h1>
</hgroup>
</header>

${document.body.innerHTML}
    `;
};

export default insertHeader;
