import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class SharedStateService {
  private stateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    "close"
  );

  private loggedIn: BehaviorSubject<any> = new BehaviorSubject<any>(true);
  buttonsState$ = this.stateSubject.asObservable();
  loggedIn$ = this.loggedIn.asObservable();

  getState() {
    return this.buttonsState$;
  }

  setState(value: string) {
    this.stateSubject.next(value);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // Needs Authentication implemented
  getLoggedState() {
    return this.loggedIn$;
  }

  setLogout() {
    return this.loggedIn.next(false);
  }

  setLogIn() {
    return this.loggedIn.next(true);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
}
