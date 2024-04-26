import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<any> {
    return this.http.get("http://localhost:8080/player/get/{id}?id=1");
  }

  // onAddPost(name: string, league: string, tier: number, lp: number) {
  //   this.http.post(
  //     "http://localhost:8080/player/create",
  //     {
  //       name: name,
  //       league: league,
  //       leagueTier: tier,
  //       lp: lp,
  //     },
  //     { observe: "response" }
  //   );
  // }

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
}
