import { Component, Input, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { LoadedProfile } from "../shared/models/loadedProfile.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-logged-user",
  standalone: true,
  imports: [],
  templateUrl: "./logged-user.component.html",
  styleUrl: "./logged-user.component.css",
})
export class LoggedUserComponent {
  @Input() loadedProfile: string;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  logout() {
    this.dataStorageService.logoutProfile();
    this.router.navigate(["/"]);
  }
}
