import { default as common, Mode } from "./build/webpack.config";

const mode = Mode[process.env.MODE] || Mode.development;

module.exports = common(mode);
