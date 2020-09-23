import Pictures from "./Model";

export default class PicturesService {
  async fetch(): Promise<Pictures> {
    const pictures = await import("@data/pictures");
    const obj: Pictures = { list: pictures.default };
    return obj;
  }
}
