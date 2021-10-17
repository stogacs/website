export class Placing {
    place:string;
    winners:string[];
    constructor(place:string, winners:string[]) {
        this.place = place;
        this.winners = winners;
    }
    public toString():string {
        return `<b>${this.place}</b>${this.winners.length > 0 ? ` - ${this.winners.join(", ")}` : ""}`;
    }
}