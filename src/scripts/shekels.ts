import {ShekelHolder} from "./data/ShekelHolder";

let shekelsFileUrl:string = "https://raw.githubusercontent.com/stogacs/shekels-leaderboard/main/shekels.txt";
let leaderboard = document.getElementById("leaderboard") as HTMLElement;
let shekelHolders:ShekelHolder[] = [];

fetch(shekelsFileUrl).then(result => {result.text().then(content => {
    // Remove empty lines and allow for comments that start with '#' if we ever need them
    let lines:string[] = content.split("\n").filter(value => !value.trim().startsWith("#") && value !== "");
    if (lines.length < 2) return;
    for (let i = 1; i < lines.length; i++) {
        console.log(i);
        let userdata:string[] = lines[i].split("|");
        if (userdata.length > 1) {
            // If our user doesn't have a preferred name, use their id
            userdata = (userdata.length < 3) ? [userdata[0], userdata[1], userdata[0]] : userdata;
            shekelHolders.push(new ShekelHolder(userdata[0], userdata[1], userdata[2]));
        } else {
            console.log(`Error: Invalid userdata ${lines[i]}`);
        }
    }
    // Sort by shekel count
    shekelHolders.sort((a, b) => (a.count > b.count) ? 1 : -1);

    shekelHolders.forEach((person, place) => {
        leaderboard.innerHTML += `<li>${getSuffix(place + 1)} - ${person.name} - ${person.count}💸</li>`
    })
})});

function getSuffix(num:number):string {
    switch (num%10) {
        case 1:
            return `${num}st`;
        case 2:
            return `${num}nd`;
        case 3:
            return `${num}rd`;
        default:
            return `${num}th`;
    }
}