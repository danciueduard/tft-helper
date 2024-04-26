import { Component, OnInit } from "@angular/core";

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from "@angular/animations";
import { CreatePlayerComponent } from "../create-player/create-player.component";
import { CommonModule } from "@angular/common";
import { ButtonsStateService } from "../../shared/buttons-state.service";
import { Router, Routes } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-welcome-page",
  standalone: true,
  imports: [CreatePlayerComponent, CommonModule],
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
  ],
  providers: [HttpClient],
})
export class WelcomePageComponent implements OnInit {
  creatingPlayer: string;

  constructor(
    private buttonsStateService: ButtonsStateService,
    private router: Router
  ) {}

  onCreatingPlayer() {
    this.creatingPlayer === "open"
      ? (this.creatingPlayer = "close")
      : (this.creatingPlayer = "open");
  }

  goToDashboard() {
    this.router.navigate(["dashboard"]);
  }

  ngOnInit(): void {
    this.buttonsStateService.state$.subscribe((state) => {
      this.creatingPlayer = state;
    });
  }
}
