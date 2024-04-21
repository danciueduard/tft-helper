import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-player-profile",
  standalone: true,
  imports: [],
  templateUrl: "./player-confirm.component.html",
  styleUrl: "./player-confirm.component.css",
})
export class PlayerConfirmComponent implements OnInit {
  name: string;
  league: string;
  tier: number;
  lp: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.queryParams["name"];
    this.league = this.route.snapshot.queryParams["league"];
    this.tier = this.route.snapshot.queryParams["tier"];
    this.lp = this.route.snapshot.queryParams["lp"];
  }
}
