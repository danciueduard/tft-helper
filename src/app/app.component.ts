import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ChildrenOutletContexts, RouterOutlet } from "@angular/router";
import { CreatePlayerComponent } from "./home/create-player/create-player.component";
import { PlayerConfirmComponent } from "./home/player-profile/player-confirm.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    CreatePlayerComponent,
    PlayerConfirmComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "tft-helper";
  player: any;

  constructor(private contexts: ChildrenOutletContexts) {}

  ngOnInit(): void {
    console.log(this.player);
  }
}
