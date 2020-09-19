export interface Competition {
  title: string;
  link: string;
  awards: Award[];
}

export interface Award {
  year: string;
  title: string;
  names: string[];
}

export interface Experiences {
  competitions: Competition[];
}

export class ExperiencesService {
  async fetch(): Promise<Experiences> {
    const experiences = (await import("./manual/experiences.json")).default;
    return experiences;
  }
}
