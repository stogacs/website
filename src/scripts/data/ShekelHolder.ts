export class ShekelHolder {
    id:string;
    count:number;
    name:string;

    constructor(id:string, count:string, name:string) {
        this.id = id.trim();
        this.count = parseInt(count.trim());
        this.name = name.trim();
    }
}