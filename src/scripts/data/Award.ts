import {Placing} from "./Placing";

export class Award {
    name: string;
    link: string;
    placings: Placing[];

    constructor(name: string, link: string, placings: Placing[]) {
        this.name = name;
        this.link = link;
        this.placings = placings;
    }

    public toString(): string {
        return `<div class="award"><a href="https://${this.link}"><h1>${this.name}</h1></a><p>${this.placings.map(placing => placing.toString()).join("<br>")}</p></div>`;
    }

    public static getAwards(): Award[] {
        return [
            new Award("Philadelphia Classic", "pclassic.org", [
                new Placing("2012 3rd Place", ["Jed Thompson", "Jichao Sun", "Scott Shi", "Allen Zhu"]),
                new Placing("2013 Spring Top 10", []),
                new Placing("2015 Spring Top 10", ["Dennis Lee", "Jeffrey Huang", "Michael Tao", "Narahari Bharadwaj"]),
                new Placing("2015 Spring 2nd Place Novice Division", ["Jason Tu", "Orion Forowycz", "Aaron Lee"]),
                new Placing("2017 Spring 1st Place Novice Division", ["Jason Tu", "Isaac Singer", "Gary Lu"]),
                new Placing("2018 Fall 1st Place Novice Division", ["Matt Gusdorff", "Rohit Chatterjee", "Mihir Dhamankar"])
            ]),
            new Award("MIT Blueprint", "blueprint.mit.org", [
                new Placing("2016 3rd Place Novice Division", ["Jason Tu", "Jason Kim", "Orion Forowycz", "Aaron Lee"]),
                new Placing("2017 Best Continued Hack", ["Jason Tu", "Vikas Chelur", "Michael Fan"]),
                new Placing("2018 Most Spirited", ["Aaron Lee", "Brady Monroe"])
            ]),
            new Award("hackMHS", "hackmhs.com", [
                new Placing("2016 Best Usage of AWS", ["Jason Tu", "Richard Xu"]),
                new Placing("2016 Best Education Hack", ["Jack Damasco", "and others"])
            ]),
            new Award("hackBCA", "hackbca.com", [
                new Placing("2017 Top 10 and Best Mobile App", ["Jason Tu", "Jason Kim", "Orion Forowycz"])
            ]),
            new Award("Swarthmore College Local Hack Day", "localhackday.mlh.io", [
                new Placing("2016 Best Overall", ["Jason Tu", "Michael Fan", "Orion Forowycz", "Richard Xu"])
            ]),
            new Award("Widener Programming Competition", "www.cs.widener.edu/contest/", [
                new Placing("2015 3rd Place", [])
            ])
        ];
    }
}