import { Component, OnInit } from "@angular/core";
import { LoggedUserComponent } from "../../logged-user/logged-user.component";
import { CapitalizeArrayPipe } from "./dashboard-comp.pipe";
import { CommonModule } from "@angular/common";
import { CreateMatchComponent } from "./create-match/create-match.component";
import { DataStorageService } from "../../shared/data-storage.service";
import { LoadedProfile } from "../../shared/models/loadedProfile.model";
import { HttpRequestsService } from "../../shared/http-requests.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    LoggedUserComponent,
    CapitalizeArrayPipe,
    CommonModule,
    CreateMatchComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  activeProfile: any | LoadedProfile = {};
  activeProfileComps: any[] = [];
  createMode: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private httpRequestsService: HttpRequestsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadUser();
      console.log(this.activeProfile);
    }, 200);
  }

  loadUser() {
    this.dataStorageService
      .getActiveProfile()
      .pipe((data: any) => (this.activeProfile = data.source.value));
  }

  createMatch() {
    this.createMode = true;
  }

  createModeOff() {
    this.createMode = false;
    // console.log(this.activeProfile);
    setTimeout(() => {
      this.dataStorageService
        .userUpdated(this.activeProfile.playerName)
        .subscribe((res) => (this.activeProfile = res));
    }, 200);
  }
}
