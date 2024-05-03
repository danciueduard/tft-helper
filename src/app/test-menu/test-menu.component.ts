import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpRequestsService } from "../shared/http-requests.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-test-menu",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./test-menu.component.html",
  styleUrl: "./test-menu.component.css",
})
export class TestMenuComponent {
  constructor(
    private httpRequestsService: HttpRequestsService,
    private dataStorageService: DataStorageService
  ) {}

  onPushData() {
    this.httpRequestsService.addDummyData();
  }

  onGetData() {
    this.httpRequestsService
      .fetchAllPosts()
      .subscribe((response) => console.log(response));
  }

  onGetActiveProfile() {
    this.dataStorageService
      .getProfile()
      .subscribe((response) => console.log(response));
  }
}
