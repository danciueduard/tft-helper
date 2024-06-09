import { trigger, transition, style, animate } from "@angular/animations";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Profile } from "../../shared/models/profile.model";
import { DataStorageService } from "../../shared/data-storage.service";
import { Observable, Subscription } from "rxjs";
import { HttpRequestsService } from "../../shared/http-requests.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-load-profile",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: "./load-profile.component.html",
  styleUrl: "./load-profile.component.css",
  animations: [
    trigger("slideUpAnimation", [
      transition(":enter", [
        style({ transform: "translateY(50%)", opacity: 0 }), // Initial position
        animate("0.3s ease", style({ transform: "translateY(0)", opacity: 1 })), // Final position
      ]),
    ]),
  ],
})
export class LoadProfileComponent implements OnInit, OnDestroy {
  profiles: Profile[] = [];
  errors: any = "";
  private profilesSubscription: Subscription | null = null;

  constructor(
    private httpRequestsService: HttpRequestsService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  useProfile(name: string) {
    this.dataStorageService.setActiveProfile(name);
  }



  loadProfiles() {
    this.profilesSubscription = this.httpRequestsService
      .fetchAllPosts()
      .subscribe({
        next: (response: any) => {
          this.profiles = response.map(
            (profile: Profile) =>
              new Profile(
                profile.league,
                profile.leagueTier,
                profile.lpPlayer,
                profile.matchCounter,
                profile.playerId,
                profile.playerName
              )
          );
        },
        error: (error: Error) => {
          this.errors = "Error loading the data...";
          console.log(error);
          // Handle the error as needed, e.g., display an error message
        },
      });
  }

  ngOnDestroy(): void {
    this.profilesSubscription?.unsubscribe();
  }
}
