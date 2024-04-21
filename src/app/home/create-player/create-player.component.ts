import {
  Component,
  ElementRef,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { PlayerConfirmComponent } from "../player-profile/player-confirm.component";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ButtonsStateService } from "../../shared/buttons-state.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-player",
  standalone: true,
  imports: [PlayerConfirmComponent, FormsModule, CommonModule],
  templateUrl: "./create-player.component.html",
  styleUrl: "./create-player.component.css",
})
export class CreatePlayerComponent implements OnInit {
  elementRef: any;

  constructor(
    private buttonsStateService: ButtonsStateService,
    private router: Router
  ) {}

  @ViewChild("playerForm") playerForm: NgForm;

  onSubmit(form: NgForm) {
    const queryParams = {
      name: form.value.name,
      league: form.value.league,
      tier: form.value.tier,
      lp: form.value.lp,
    };

    // this.buttonsStateService.setState("close");
    this.router.navigate(["/new"], { queryParams });
  }

  ngOnInit(): void {}
}
