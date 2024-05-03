import {
  Component,
  ElementRef,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { PlayerConfirmComponent } from "./player-confirm/player-confirm.component";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import {
  AnimationEvent,
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-create-player",
  standalone: true,
  imports: [PlayerConfirmComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: "./create-player.component.html",
  styleUrl: "./create-player.component.css",
  animations: [
    trigger("slideUpAnimation", [
      transition(":enter", [
        style({ transform: "translateY(50%)", opacity: 0 }), // Initial position
        animate("0.3s ease", style({ transform: "translateY(0)", opacity: 1 })), // Final position
      ]),
    ]),
    trigger("buttonAppearAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate(
          "200ms 0.1s",
          style({ opacity: 1, transform: "translateY(0)" })
        ),
      ]),
    ]),
    trigger("pinguAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("1000ms 0.3s", keyframes([style({ opacity: 1 })])),
      ]),
    ]),
    trigger("expandingLine", [
      state(
        "expand",
        style({
          width: "15rem",
        })
      ),
      transition("false => expand", [animate("1.5s")]),
    ]),
  ],
})
export class CreatePlayerComponent implements OnInit {
  elementRef: any;
  animationDone = false;
  expandLine: string = "false";

  constructor(private router: Router) {}

  @ViewChild("playerForm") playerForm: NgForm;

  onSubmit(form: NgForm) {
    const queryParams = {
      name: form.value.name,
      league: form.value.league,
      tier: form.value.tier,
      lp: form.value.lp,
    };
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.fromState === "void" || event.phaseName === "") {
      // Animation is complete
      this.animationDone = true;
      this.expandLine = "expand";
    }
  }

  ngOnInit(): void {}
}
