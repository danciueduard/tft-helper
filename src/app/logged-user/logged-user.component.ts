import { Component } from "@angular/core";
import { User } from "../home/dashboard/comp/player.model";

@Component({
  selector: "app-player-profile",
  standalone: true,
  imports: [],
  templateUrl: "./logged-user.component.html",
  styleUrl: "./logged-user.component.css",
})
export class LoggedUserComponent {
  constructor() {}

  logout() {}
}
