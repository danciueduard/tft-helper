import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ChildrenOutletContexts, RouterOutlet } from "@angular/router";
import { CreatePlayerComponent } from "./home/create-player/create-player.component";
import { PlayerConfirmComponent } from "./home/create-player/player-confirm/player-confirm.component";
import { animate, style, transition, trigger } from "@angular/animations";
import { PlayerProfileComponent } from "./player-profile/player-profile.component";
import { DataStorageService } from "./shared/data-storage.service";
import { SharedStateService } from "./shared/shared-state.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    CreatePlayerComponent,
    PlayerConfirmComponent,
    PlayerProfileComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("0.5s", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("0.5s", style({ opacity: 0 }))]),
    ]),
  ],
  providers: [HttpClient, HttpClientModule],
})
export class AppComponent implements OnInit {
  title = "tft-helper";
  player: any;
  loggedIn: Observable<boolean>;

  constructor(
    private contexts: ChildrenOutletContexts,
    private sharedStateService: SharedStateService
  ) {}

  ngOnInit(): void {
    this.sharedStateService
      .getLoggedState()
      .subscribe((result) => (this.loggedIn = result));
  }
}
