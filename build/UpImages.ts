import fs from "fs";
import glob from "glob";
import path from "path";
import webpack from "webpack";

const hook = (): void => {
  const src = "src";
  const data = path.join(src, "data");
  const load = path.join(data, "load");
  const pictures = path.join(load, "pictures");

  const target = path.join(data, "images.ts");
  glob("*", { cwd: pictures }, (err, files) => {
    if (err) {
      process.exit(1);
    }

    const imports = files.map(
      (f, k) => `import image${k} from "@data/load/pictures/${f}";\nimages.push(image${k});`,
    );
    const importEcho = imports.join("\n");
    const echo = `const images = [];
${importEcho}
export default images;
`;
    fs.writeFileSync(target, echo);
  });
};

const Plugin = {
  apply: (compiler: webpack.Compiler): void => {
    compiler.hooks.beforeCompile.tap("UpImages", () => {
      hook();
    });
  },
};

export default Plugin;
