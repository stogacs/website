export const splitChunks = <T>(array: T[], chunk_size: number): T[][] =>
  Array(Math.ceil(array.length / chunk_size))
    .fill({})
    .map((_, index) => index * chunk_size)
    .map((begin) => array.slice(begin, begin + chunk_size));
