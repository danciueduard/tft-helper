import { Component } from "@angular/core";
import { User } from "../home/dashboard/comp/player.model";
import { SharedStateService } from "../shared/shared-state.service";

@Component({
  selector: "app-player-profile",
  standalone: true,
  imports: [],
  templateUrl: "./player-profile.component.html",
  styleUrl: "./player-profile.component.css",
})
export class PlayerProfileComponent {
  constructor(private sharedStateService: SharedStateService) {}

  logout() {
    this.sharedStateService.setLogout();
  }
}
