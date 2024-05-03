import { Injectable } from "@angular/core";
import { HttpRequestsService } from "./http-requests.service";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { LoadedProfile } from "./models/loadedProfile.model";
import { Profile } from "./models/profile.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  private loadedProfilesSubject = new BehaviorSubject<Profile[] | null>(null);
  private activeProfileSubject = new BehaviorSubject<LoadedProfile | null>(
    null
  );

  loadedProfiles$ = this.loadedProfilesSubject.asObservable();
  activeProfile$ = this.activeProfileSubject.asObservable();

  constructor(private httpRequestsService: HttpRequestsService) {}

  setActiveProfile(name: string) {
    this.httpRequestsService
      .fetchProfileByName(name)
      .pipe(
        catchError((error) => {
          console.error("Error fetching active profile:", error);
          return [];
        })
      )
      .subscribe((response) => {
        const loadedProfile = new LoadedProfile(
          response?.league!,
          response?.lpPlayer!,
          response?.matches!,
          response?.playerName!
        );
        this.activeProfileSubject.next(loadedProfile);
      });
  }

  getActiveProfile(): Observable<LoadedProfile | null> {
    return this.activeProfile$;
  }

  logoutProfile() {
    this.activeProfileSubject.next(null);
  }

  loadProfiles() {
    if (!this.loadedProfilesSubject.value) {
      this.httpRequestsService
        .fetchAllPosts()
        .pipe(
          catchError((error) => {
            console.error("Error fetching profiles:", error);
            return [];
          }),
          finalize(() => console.log("Profiles loaded successfully!"))
        )
        .subscribe((response) => {
          let profiles = [];
          for (let item of response) {
            profiles.push(
              new Profile(
                item.league,
                item.leagueTier,
                item.lpPlayer,
                item.matchCounter,
                item.playerId,
                item.playerName
              )
            );
          }
          this.loadedProfilesSubject.next(profiles);
        });
    }
  }

  getProfiles(): Observable<Profile[] | null> {
    this.loadProfiles();
    return this.loadedProfiles$;
  }
}
