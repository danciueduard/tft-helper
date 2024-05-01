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
import { SharedStateService } from "../shared/shared-state.service";
import { Router, Routes } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LoadProfileComponent } from "../load-profile/load-profile.component";

@Component({
  selector: "app-welcome-page",
  standalone: true,
  imports: [CreatePlayerComponent, CommonModule, LoadProfileComponent],
  templateUrl: "./welcome-page.component.html",
  styleUrl: "./welcome-page.component.css",
  animations: [
    trigger("hideButtons", [
      state(
        "open",
        style({
          transform: "translateY(-300%)",
          filter: "opacity(0)",
        })
      ),
      // state("close", style({})),
      transition("open <=> close", [animate("0.6s")]),
      // transition("open => void", [animate("0.6s")]),
    ]),
    trigger("openForm", [
      state(
        "open",
        style({
          transform: "translateY(-70%)",
          opacity: 1,
        })
      ),
      state(
        "close",
        style({
          transform: "translateY(50%)",
        })
      ),
      transition("open <=> close", [animate("0.4s")]),
    ]),
    trigger("showLegend", [
      state(
        "open",
        style({
          opacity: "1",
        })
      ),
      state(
        "close",
        style({
          opacity: "0",
        })
      ),
      transition("close => open", [animate("0.6s 0.35s")]),
      transition("open => close", [animate("0.4s")]),
    ]),
    trigger("horizontalLine", [
      state(
        "open",
        style({
          width: "200px",
        })
      ),

      transition("close => open", [animate("0.7s 0.8s")]),
      transition("open => close", [animate("0.1s")]),
    ]),
    trigger("showProfiles", [
      state("open", style({})),

      transition("close => open", [animate("0.7s")]),
      transition("open => close", [animate("0.1s")]),
    ]),
    ///////////////////////////////////////////////////////////////////
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("300ms", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("300ms", style({ opacity: 0 }))]),
    ]),
    //////////////////////////////////////////////////////////////////
  ],
  providers: [HttpClient],
})
export class WelcomePageComponent implements OnInit {
  creatingPlayer: string;
  loadingPlayer = "close";

  constructor(
    private sharedStateService: SharedStateService,
    private router: Router
  ) {}

  onCreatingPlayer() {
    this.creatingPlayer === "open"
      ? (this.creatingPlayer = "close")
      : (this.creatingPlayer = "open");
  }
  onLoadingPlayer() {
    this.loadingPlayer === "open"
      ? (this.loadingPlayer = "close")
      : (this.loadingPlayer = "open");
  }

  goToDashboard() {
    this.router.navigate(["dashboard"]);
  }

  ngOnInit(): void {
    this.sharedStateService.buttonsState$.subscribe((state) => {
      this.creatingPlayer = state;
    });
  }
}
