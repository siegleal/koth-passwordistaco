export class Team {
    city: string;
    name: string;
    abbr: string;
    getFullName(): string {
        return this.city + ' ' + this.name;
    }

    constructor(abbr: string, city: string, name: string) {
        this.abbr = abbr;
        this.city = city;
        this.name = name;
    }
}