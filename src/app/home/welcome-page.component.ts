import { Component, OnInit } from "@angular/core";

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from "@angular/animations";
import { CreatePlayerComponent } from "./create-player/create-player.component";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule, Routes } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LoadProfileComponent } from "./load-profile/load-profile.component";

@Component({
  selector: "app-welcome-page",
  standalone: true,
  imports: [
    CreatePlayerComponent,
    CommonModule,
    LoadProfileComponent,
    RouterModule,
  ],
  templateUrl: "./welcome-page.component.html",
  styleUrl: "./welcome-page.component.css",
  animations: [
    trigger("hideButtons", [
      state(
        "inactive",
        style({
          transform: "translateY(-300%)",
          filter: "opacity(0)",
        })
      ),

      transition("active <=> inactive", [animate("0.6s")]),
    ]),
  ],
})
export class WelcomePageComponent {
  routerOutletState: any = "active";

  constructor(private router: Router) {}

  navigateToLink(route: string) {
    this.routerOutletState = "inactive";
    setTimeout(() => {
      this.router.navigate([route]);
    }, 300);
  }
}
