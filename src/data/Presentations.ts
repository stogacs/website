export interface Presentation {
  title: string;
  slug: string;
  author: string;
  year: number;
  description: string;
  links: PresentationLink[];
}

export interface PresentationLink {
  url: string;
  tooltip: string;
  icon:
    | {
        set: string;
        name: string;
      }
    | string;
}

export class PresentationsService {
  async fetch(): Promise<Presentation[]> {
    const data = (await import("./load/presentations.json")).default;
    return data;
  }
}
