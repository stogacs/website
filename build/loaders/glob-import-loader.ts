import loaderFunc from "./glob-import-loader-runtime";

function loader(this: any, source: string): string {
  this.cacheable();
  return loaderFunc(this, source);
}

export default loader;
