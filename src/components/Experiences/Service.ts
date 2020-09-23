import Experiences from "./Model";

export default class ExperiencesService {
  async fetch(): Promise<Experiences> {
    const experiences = (await import("@data/experiences.json")).default;
    return experiences;
  }
}
