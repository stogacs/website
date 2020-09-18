export interface Link {
  name: string;
  url: string;
  icon: string;
}

export interface Person {
  name: string;
  position: string;
  photo: string;
  links: Link[];
}

export interface Contacts {
  links: Link[];
  people: Person[];
}
