import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Profile } from "./models/profile.model";

@Injectable({ providedIn: "root" })
export class HttpRequestsService {
  constructor(private http: HttpClient) {}

  fetchProfileByName(name: string): Observable<any> {
    return this.http.get(`http://localhost:8080/player/get?playerName=${name}`);
  }

  fetchAllPosts(): Observable<Profile> | any {
    return this.http.get("http://localhost:8080/player/get-all");
  }

  addPost(
    name: string,
    league: string,
    tier: number,
    lp: number
  ): Observable<any> {
    const data = {
      name: name,
      league: league,
      tier: tier,
      lp: lp,
    };
    // Using { observe: 'response' } to observe the full HTTP response
    return this.http.post<any>("http://localhost:8080/player/create", data, {
      observe: "response",
    });
  }

  addDummyData() {
    this.addPost("Test1", "bronze", 1, 29).subscribe();
    this.addPost("Test2", "silver", 2, 39).subscribe();
    this.addPost("Test3", "gold", 3, 49).subscribe();
    this.addPost("Test4", "platinum", 4, 59).subscribe();
  }
}
