import glob from "glob";
import path from "path";

const replacer = (
  context: any,
  match: string,
  fromStatement: string,
  obj: string,
  quote: string,
  filename: string,
): string => {
  const importModules = /import +(\w+) +from +(['"])(.*?)\2/gm;
  const importFiles = /import +(['"])(.*?)\1/gm;
  const importSass = /@import +(['"])(.*?)\1/gm;

  const modules = [];
  let withModules = false;
  if (!glob.hasMagic(filename)) return match;
  let result = glob
    .sync(filename, {
      cwd: path.dirname(context.resourcePath),
    })
    .map((file, index) => {
      const fileName = quote + file + quote;
      if (match.match(importSass)) {
        return "@import " + fileName;
      } else if (match.match(importModules)) {
        const moduleName = obj + index;
        modules.push(moduleName);
        withModules = true;
        return "import " + moduleName + " from " + fileName;
      } else if (match.match(importFiles)) {
        return "import " + fileName;
      }
    })
    .join(";\n");
  if (result && withModules) {
    result += ";\nconst " + obj + " = [" + modules.join(", ") + "]";
  }

  return result;
};

const loader = (context: any, source: string): string => {
  const regex = /.?import + ?((\w+) +from )?(['"])(.*?)\3/gm;

  const res = source.replace(regex, (match, fromStatement, obj, quote, filename) =>
    replacer(context, match, fromStatement, obj, quote, filename),
  );

  return res;
};

export default loader;
