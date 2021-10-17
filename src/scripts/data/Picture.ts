export class Picture {
    min:number;
    max:number;
    current:number;
    constructor(min:number, max:number, current:number) {
        this.min = min;
        this.max = max;
        this.current = current;
    }
    public advance():void {
        this.current = (this.current == this.max) ? this.min : this.current + 1;
    }
    public getCurrent():string {
        return this.current < 10 ? "0" + this.current : "" + this.current;
    }
}