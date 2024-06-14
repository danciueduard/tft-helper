import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpRequestsService } from "../shared/http-requests.service";
import { DataStorageService } from "../shared/data-storage.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-test-menu",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: "./test-menu.component.html",
  styleUrl: "./test-menu.component.css",
})
export class TestMenuComponent {
  debugMode = false;

  constructor(
    private httpRequestsService: HttpRequestsService,
    private dataStorageService: DataStorageService
  ) {}

  onPushData() {
    this.httpRequestsService.addDummyData();
    console.log("test profiles pushed");
  }

  onGetData() {
    this.httpRequestsService
      .fetchAllPosts()
      .subscribe((response: any) => console.log(response));
    console.log("profiles loaded");
  }

  onGetActiveProfile() {
    this.dataStorageService
      .getActiveProfile()
      .subscribe((response) =>
        console.log(response === null ? "no profile active" : response)
      );
  }

  onLogout() {
    this.dataStorageService.logoutProfile();
    console.log("logged out");
  }

  onTestUser() {
    this.dataStorageService.setActiveProfile("Test1");
  }
}
