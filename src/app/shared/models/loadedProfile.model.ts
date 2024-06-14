import { Match } from "./match.model";

export class LoadedProfile {
  league: string;
  lpPlayer: number;
  matches: [] = [];
  playerName: string;
  tier: number;

  constructor(
    league: string,
    lpPlayer: number,
    matches: [],
    playerName: string,
    tier: number
  ) {
    this.league = league;
    this.lpPlayer = lpPlayer;
    this.matches = matches;
    this.playerName = playerName;
    this.tier = tier;
  }
}
