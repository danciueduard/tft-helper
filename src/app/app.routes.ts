import { Routes } from "@angular/router";
import { WelcomePageComponent } from "./home/welcome-page/welcome-page.component";
import { PlayerConfirmComponent } from "./home/player-profile/player-confirm.component";
import { DashboardComponent } from "./home/dashboard/dashboard.component";
import { animation } from "@angular/animations";

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
    component: DashboardComponent,
    data: {
      animation: "enterLeavePage",
    },
  },
];
