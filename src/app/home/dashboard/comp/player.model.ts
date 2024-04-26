export class User {
  constructor(
    public name: string,
    public league: string,
    public lp: number,
    public comps: [string]
  ) {}
}
