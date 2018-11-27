import { Pick } from './pick';

export class UserPick {
    email: string;
    picks: Pick[];
    name: string;

    constructor(object: any){
        this.email = object.email;
        this.picks = object.picks;
        this.name = object.name;
    }

    getTotal(): number {
      return this.picks.reduce<number>((acc, curr) => acc + curr.points, 0);
    }
}