import { Routes } from "@angular/router";
import { WelcomePageComponent } from "./profiles/welcome-page.component";
import { PlayerConfirmComponent } from "./profiles/create-player/player-confirm/player-confirm.component";
import { animation } from "@angular/animations";
import { LoggedUserComponent } from "./logged-user/logged-user.component";
import { CreatePlayerComponent } from "./profiles/create-player/create-player.component";
import { LoadProfileComponent } from "./profiles/load-profile/load-profile.component";
import { DashboardComponent } from "./logged-user/dashboard/dashboard.component";

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
      validForm: true,
    },
    children: [
      {
        path: "confirm",
        component: PlayerConfirmComponent,
      },
    ],
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
