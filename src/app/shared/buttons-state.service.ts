import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ButtonsStateService {
  private stateSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    "close"
  );
  state$ = this.stateSubject.asObservable();

  getState() {
    return this.state$;
  }

  setState(value: string) {
    this.stateSubject.next(value);
  }
}
