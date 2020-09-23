export default interface Presentation {
  title: string;
  slug: string;
  author: string | string[];
  year: number;
  description: string;
  categories: string | string[];
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
