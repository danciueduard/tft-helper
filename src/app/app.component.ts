import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, OnInit, Output } from "@angular/core";
import {
  ChildrenOutletContexts,
  Router,
  RouterModule,
  RouterOutlet,
} from "@angular/router";
import { animate, style, transition, trigger } from "@angular/animations";
import { LoggedUserComponent } from "./logged-user/logged-user.component";
import { HttpRequestsService } from "./shared/http-requests.service";
import { Observable } from "rxjs";
import { TestMenuComponent } from "./test-menu/test-menu.component";
import { CreatePlayerComponent } from "./profiles/create-player/create-player.component";
import { PlayerConfirmComponent } from "./profiles/create-player/player-confirm/player-confirm.component";
import { DataStorageService } from "./shared/data-storage.service";
import { LoadedProfile } from "./shared/models/loadedProfile.model";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    CreatePlayerComponent,
    PlayerConfirmComponent,
    LoggedUserComponent,
    RouterModule,
    TestMenuComponent,
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
  activeProfile: string | null = null;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.dataStorageService.getActiveProfile().subscribe((response) => {
      response?.playerName === undefined
        ? (this.activeProfile = null)
        : (this.activeProfile = response.playerName!);
    });
  }
}
