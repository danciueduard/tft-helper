import { trigger, transition, style, animate } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-load-profile",
  standalone: true,
  imports: [],
  templateUrl: "./load-profile.component.html",
  styleUrl: "./load-profile.component.css",
  animations: [
    trigger("slideUpAnimation", [
      transition(":enter", [
        style({ transform: "translateY(50%)", opacity: 0 }), // Initial position
        animate("0.3s ease", style({ transform: "translateY(0)", opacity: 1 })), // Final position
      ]),
    ]),
  ],
})
export class LoadProfileComponent {}
