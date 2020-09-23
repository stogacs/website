import Presentation from "./Model";

export default class PresentationsService {
  async fetch(): Promise<Presentation[]> {
    const data = (await import("@data/presentations.json")).default;
    return data;
  }
}
