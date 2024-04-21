import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  onFetchPost() {
    this.http
      .get("http://localhost:8080/player/get/{id}?id=1")
      .subscribe((res) => {});
  }

  onAddPost() {
    this.http
      .post("http://localhost:8080/player/create", {
        name: "test",
        league: "challenger",
        leagueTier: 1,
        lp: 90,
      })
      .subscribe();
  }
}
