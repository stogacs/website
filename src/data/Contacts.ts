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
  photo: string;
  links: Link[];
}

export interface Contacts {
  links: Link[];
  people: Person[];
}

export class ContactsService {
  async fetch(): Promise<Contacts> {
    const data = (await import("./manual/contacts.json")).default;
    return data;
  }
}
