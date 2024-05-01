import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DataStorageService } from "../../shared/data-storage.service";
import { PlayerProfileComponent } from "../../player-profile/player-profile.component";
import { mockData } from "./mockData";
import { CapitalizeArrayPipe } from "./dashboard-comp.pipe";
import { CommonModule } from "@angular/common";
import { CreateMatchComponent } from "./create-match/create-match.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    PlayerProfileComponent,
    CapitalizeArrayPipe,
    CommonModule,
    CreateMatchComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  // users: {}; Later, when Fetch All Users will be implemented
  createMode: boolean = false;

  //Temporary!
  data = mockData;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    // this.dataStorageService
    //   .fetchPosts()
    //   .subscribe((response) => console.log(response));
  }

  createMatch() {
    this.createMode = true;
  }

  cancelCreateMatch() {
    this.createMode = false;
  }
}
