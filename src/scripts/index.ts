import {Award} from "./data/Award";
import {Person} from "./data/Person";

// Awards
let awards = document.getElementById("awards") as HTMLElement;
awards.innerHTML = Award.getAwards().map(award => award.toString()).join("");

// Contacts
let people = document.getElementById("people") as HTMLElement;
people.innerHTML = Person.getPeople().map(person => `<div class="flex person"><img src="/assets/media/people/${person.getId()}.jpg"><div class="flex info"><h1>${person.getName()}</h1><p>${person.getTitle()}</p></div></div>`).join("");