import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../../shared/data-storage.service";
import { PlayerProfileComponent } from "./player-profile/player-profile.component";
import { mockData } from "./mockData";
import { CapitalizeArrayPipe } from "./dashboard-comp.pipe";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [PlayerProfileComponent, CapitalizeArrayPipe, CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  // users: {}; Later, when Fetch All Users will be implemented

  //Temporary!
  data = mockData;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    // this.dataStorageService
    //   .fetchPosts()
    //   .subscribe((response) => console.log(response));
  }
}
