import { Routes } from "@angular/router";
import { WelcomePageComponent } from "./home/welcome-page.component";
import { PlayerConfirmComponent } from "./home/create-player/player-confirm/player-confirm.component";
import { DashboardComponent } from "./home/dashboard/dashboard.component";
import { animation } from "@angular/animations";
import { PlayerProfileComponent } from "./player-profile/player-profile.component";

export const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "welcome", component: WelcomePageComponent },
  {
    path: "new",
    component: PlayerConfirmComponent,
    data: {
      animation: "enterLeavePage",
    },
  },
  {
    path: "dashboard",
    children: [{ path: "player/:id", component: PlayerProfileComponent }],
    component: DashboardComponent,
    data: {
      animation: "enterLeavePage",
    },
  },
];
