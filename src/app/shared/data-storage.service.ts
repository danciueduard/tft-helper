import { Injectable, OnInit } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Profile } from "./models/profile.model";
import { LoadedProfile } from "./models/loadedProfile.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  private profileSubject = new BehaviorSubject<LoadedProfile | null>(null);
  loadedProfile$ = this.profileSubject.asObservable();

  constructor(private httpRequestsService: HttpRequestsService) {}

  setProfile(name: string) {
    this.httpRequestsService.fetchProfileByName(name).subscribe((response) => {
      this.profileSubject.next(response);
    });
  }

  getProfile() {
    return this.loadedProfile$;
  }

  logoutProfile() {
    this.profileSubject.next(null);
  }
}
