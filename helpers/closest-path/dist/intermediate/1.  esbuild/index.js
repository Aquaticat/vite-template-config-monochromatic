// src/index.ts
import path from "path";
import fs from "fs";
var closestPath = (currentPath = path.resolve(), selectors = "package.json", layers = 1) => {
  if (fs.existsSync(path.join(currentPath, selectors))) {
    if (layers === 1) {
      return currentPath;
    }
    return closestPath(path.join(currentPath, ".."), selectors, layers - 1);
  }
  return closestPath(path.join(currentPath, ".."), selectors, layers);
};
var src_default = closestPath;
export {
  src_default as default
};
