export class Person {
    firstName:string;
    lastName:string;
    graduationYear:number;
    title:string;

    constructor(firstName:string, lastName:string, graduationYear:number, title:string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.graduationYear = graduationYear;
        this.title = title;
    }

    public getName():string {
        return this.firstName + " " + this.lastName;
    }
    public getId():string {
        // FIXME: will break after 2100
        return `${(this.graduationYear-2000)}${this.lastName}${this.firstName.charAt(0)}`
    }
    public getTitle():string {
        return this.title;
    }
    public static getPeople():Person[] {
        return [
            new Person("Jeffrey", "Tan", 2022, "Co-President"),
            new Person("Aditya", "Sirohi", 2022, "Co-President"),
            new Person("Sean", "Nissenbaum", 2022, "Officer"),
            new Person("Saj", "Agarwala", 2023, "Officer"),
            new Person("Brendan", "McQuilkin", 2023, "Officer")
        ]
    }

}