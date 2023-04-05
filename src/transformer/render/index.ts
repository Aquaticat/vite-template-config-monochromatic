import {
  DOMParser,
  parseHTML,
} from 'linkedom';

const render = (file: string, format = 'html'): string => {
  switch (format) {
    case 'html': {
      const documentFragment = (new DOMParser())
        .parseFromString(file, 'text/html');

      const { document } = parseHTML(`
<html lang="en"
      style="
      --light: #f9f9f9;
      --dark: #1b1b1b;
      background-color: black;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width">
  <title>Home</title>
  <link type="text/css"
        rel="stylesheet"
        blocking="render"
        fetchpriority="high"
        href="/index.scss">
  <script type="module"
          rel="script"
          async
          src="/index.ts"></script>
</head>
<body>
</body>
</html>
`);

      document.body.innerHTML = [...documentFragment.children].map((documentFragmentChild) =>
        documentFragmentChild.outerHTML
      ).join('');

      return [...document.children].map((documentChild) => documentChild.outerHTML).join('');
    }

    default: {
      throw TypeError(`${format} is not one of supported types.
      Supported types:
      'html',
      'md' (GitHub flavored markdown)
      'mdx'`);
    }
  }
};

export default render;
