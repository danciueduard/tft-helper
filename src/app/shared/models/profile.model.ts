export class Profile {
  constructor(
    public league: string,
    public leagueTier: number,
    public lpPlayer: number,
    public matchCounter: number,
    public playerId: number,
    public playerName: string
  ) {}
}
