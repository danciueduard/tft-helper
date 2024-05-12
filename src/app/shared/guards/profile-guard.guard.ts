import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ProfileGuard implements CanActivate {
  constructor(private router: Router) {}
}
