export interface Link {
  name: string;
  url: string;
  icon:
    | {
        set: string;
        name: string;
      }
    | string;
}

export interface Person {
  name: string;
  position: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any;
  links: Link[];
}

export default interface Contacts {
  links: Link[];
  people: Person[];
  code: string;
}
