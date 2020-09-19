export interface Pictures {
  list: string[];
}

export class PicturesService {
  async fetch(): Promise<Pictures> {
    const pictures = await import("./images");
    const obj: Pictures = { list: pictures.default };
    return obj;
  }
}
