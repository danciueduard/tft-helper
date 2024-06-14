import { Injectable } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { BehaviorSubject } from "rxjs";
import { LoadedProfile } from "./models/loadedProfile.model";
import { Profile } from "./models/profile.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  // prettier-ignore
  private activeProfileSubject = new BehaviorSubject<LoadedProfile | null>(null);
  activeProfile$ = this.activeProfileSubject.asObservable();

  constructor(private httpRequestsService: HttpRequestsService) {}

  setActiveProfile(name: string) {
    this.httpRequestsService.fetchProfileByName(name).subscribe((response) => {
      this.activeProfileSubject.next(
        new LoadedProfile(
          response?.league!,
          response?.lpPlayer!,
          response?.matches!,
          response?.playerName!,
          response?.tier
        )
      );
    });
  }

  getActiveProfile() {
    return this.activeProfile$;
  }

  logoutProfile() {
    this.activeProfileSubject.next(null);
  }

  userUpdated(name: string) {
    this.httpRequestsService
      .fetchProfileByName(name)
      .subscribe((res) =>
        this.activeProfileSubject.next(
          new LoadedProfile(
            res?.league!,
            res?.lpPlayer!,
            res?.matches!,
            res?.playerName!,
            res?.tier
          )
        )
      );
    this.setActiveProfile(name);
    return this.getActiveProfile();
  }
}
