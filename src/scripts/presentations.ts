import presentations from "./data/presentations.json";

// TODO: make prettier

let element = document.getElementById("presentations") as HTMLElement;
presentations.forEach(presentation => {
    element.innerHTML += `<li><a href=${presentation.links[0].url}>${presentation.title}</a> by ${presentation.author}</li>`;
})