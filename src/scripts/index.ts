import {Award} from "./data/Award";
import {Picture} from "./data/Picture";
import {Person} from "./data/Person";

// Awards
let awards = document.getElementById("awards") as HTMLElement;
awards.innerHTML = Award.getAwards().map(award => award.toString()).join("");

// Slideshow
let picture = new Picture(1, 12, 1);
document.getElementById("slideshow")!.innerHTML = `<img id="slideshow-image" src="/assets/media/slideshow/${picture.getCurrent()}.jpg">`;
let slideshow:HTMLImageElement = document.getElementById("slideshow-image") as HTMLImageElement;
slideshow.addEventListener('click', () => {
    picture.advance();
    slideshow.src = `assets/media/slideshow/${picture.getCurrent()}.jpg`;
});

// Contacts
let people = document.getElementById("people") as HTMLElement;
people.innerHTML = Person.getPeople().map(person => `<div class="flex person"><img src="/assets/media/people/${person.getId()}.jpg"><div class="flex info"><h1>${person.getName()}</h1><p>${person.getTitle()}</p></div></div>`).join("");