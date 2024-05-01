import { Routes } from "@angular/router";
import { WelcomePageComponent } from "./home/welcome-page.component";
import { PlayerConfirmComponent } from "./home/create-player/player-confirm/player-confirm.component";
import { DashboardComponent } from "./home/dashboard/dashboard.component";
import { animation } from "@angular/animations";
import { LoggedUserComponent } from "./logged-user/logged-user.component";
import { CreatePlayerComponent } from "./home/create-player/create-player.component";
import { LoadProfileComponent } from "./home/load-profile/load-profile.component";

export const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  {
    path: "welcome",
    component: WelcomePageComponent,
  },
  {
    path: "new",
    component: CreatePlayerComponent,
    data: {
      animation: "enterLeavePage",
    },
  },
  {
    path: "load",
    component: LoadProfileComponent,
    data: {
      animation: "enterLeavePage",
    },
  },

  {
    path: "dashboard",
    children: [{ path: "player/:id", component: LoggedUserComponent }],
    component: DashboardComponent,
    data: {
      animation: "enterLeavePage",
    },
  },
];
