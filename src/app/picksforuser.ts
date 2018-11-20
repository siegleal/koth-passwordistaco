import { Pick } from './pick';

export class PicksForUser  {
    name: string;
    picks: Pick[];

    constructor(n: string, p: Pick[]){
      this.name = n;
      this.picks = p;
    }

    getTotal(): number {
      return this.picks.reduce<number>((acc, curr) => acc + curr.points, 0);
    }
  };