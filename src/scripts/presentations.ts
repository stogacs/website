import presentations from "./data/presentations.json";

let element = document.getElementById("presentations") as HTMLElement;
element.innerHTML = "";
presentations.forEach(presentation => {
    element.innerHTML += `<li><a href=${presentation.links[0].url}>${presentation.title}</a> by ${presentation.author}</li>`;
})