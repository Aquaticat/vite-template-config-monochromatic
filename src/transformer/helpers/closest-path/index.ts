import fs from 'fs';

import path from 'path';

const closestPath = (directory = path.resolve(), selectors = 'package.json'): string => {
  if (fs.existsSync(path.join(directory, selectors)))
    return directory;

  return closestPath(path.join(directory, '..'));
};

export default closestPath;
