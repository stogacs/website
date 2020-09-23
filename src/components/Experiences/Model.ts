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

export default interface Experiences {
  competitions: Competition[];
}
