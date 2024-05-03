import { Match } from "./match.model";

export class LoadedProfile {
  league: string;
  lpPlayer: number;
  matches: [] = [];
  playerName: string;

  constructor(
    league: string,
    lpPlayer: number,
    matches: [],
    playerName: string
  ) {
    this.league = league;
    this.lpPlayer = lpPlayer;
    this.matches = matches;
    this.playerName = playerName;
  }
}
