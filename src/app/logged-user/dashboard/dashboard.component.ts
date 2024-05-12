import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { LoggedUserComponent } from "../../logged-user/logged-user.component";
import { mockData } from "./mockData";
import { CapitalizeArrayPipe } from "./dashboard-comp.pipe";
import { CommonModule } from "@angular/common";
import { CreateMatchComponent } from "./create-match/create-match.component";
import { DataStorageService } from "../../shared/data-storage.service";
import { LoadedProfile } from "../../shared/models/loadedProfile.model";

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
  activeProfile: any | LoadedProfile;
  createMode: boolean = false;

  //Temporary!
  data = mockData;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.activeProfile = this.dataStorageService.getActiveProfile();
    console.log(this.activeProfile.source.value);
  }

  createMatch() {
    this.createMode = true;
  }

  cancelCreateMatch() {
    this.createMode = false;
  }
}
