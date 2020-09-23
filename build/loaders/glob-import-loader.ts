import loaderFunc from "./glob-import-loader-runtime";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function loader(this: any, source: string): string {
  this.cacheable();
  return loaderFunc(this, source);
}

export default loader;
