import { trigger, transition, style, animate } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { Data, RouterModule } from "@angular/router";
import { Profile } from "../../shared/models/profile.model";
import { DataStorageService } from "../../shared/data-storage.service";
import { Observable, map } from "rxjs";
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
export class LoadProfileComponent implements OnInit {
  public profiles: Profile[] = [];

  constructor(
    private httpRequestsService: HttpRequestsService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.dataStorageService
      .getProfiles()
      .subscribe((response) => (this.profiles = response!));
  }

  useProfile(name: string) {
    this.dataStorageService.setActiveProfile(name);
  }
}
