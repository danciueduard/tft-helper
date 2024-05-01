import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-create-match",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./create-match.component.html",
  styleUrl: "./create-match.component.css",
})
export class CreateMatchComponent {
  @Output() closeWindow = new EventEmitter<boolean>();

  moreFields: boolean = false;
  newComp: boolean = false;

  addMoreFields() {
    this.moreFields = true;
  }

  toggleNewComp() {
    this.newComp = !this.newComp;
  }

  submitMatch() {}

  cancelMatch() {
    this.closeWindow.emit(true);
  }
}
