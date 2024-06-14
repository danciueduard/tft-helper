import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form, FormsModule } from "@angular/forms";
import { HttpRequestsService } from "../../../shared/http-requests.service";
import { DataStorageService } from "../../../shared/data-storage.service";

@Component({
  selector: "app-create-match",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./create-match.component.html",
  styleUrl: "./create-match.component.css",
})
export class CreateMatchComponent implements OnInit {
  @Output() closeWindow = new EventEmitter<boolean>();
  @Input() playerName: string;
  loadedComps: any[] = [];
  moreFields: boolean = false;
  newComp: boolean = false;

  constructor(
    private httpRequestsService: HttpRequestsService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    // load existing comps into the dropdown menu
    this.httpRequestsService
      .getAllComps(this.playerName)
      .subscribe((res) =>
        res.content.forEach((element: []) => this.loadedComps.push(element))
      );
  }

  addMoreFields() {
    this.moreFields = true;
  }

  toggleNewComp() {
    this.newComp = !this.newComp;
  }

  submitMatch(form: Form | any) {
    console.log(form.form.value.existingComp);
    const formData = form.form.value.existingComp;
    this.httpRequestsService
      .createMatch(
        formData.win,
        formData.lp,
        formData.compName,
        this.playerName
      )
      .subscribe();
    this.onCloseWindow();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Helper Function - It takes champions from createComp form inputs and moves them into an array. If the user added extra champions, it merges them into a single array
  createChampionsArray(
    champions: { [key: string]: any },
    extraChampions: { [key: string]: any } = {}
  ): any[] {
    const championsArray: any[] = [];
    const values1: any[] = Object.values(champions);
    const values2: any[] = Object.values(extraChampions);
    championsArray.push(...values1, ...values2);
    return championsArray.filter((word) => word !== "");
  }

  submitNewComp(form: Form | any) {
    const newComp = form.form.value.newComp;
    const data = {
      playerName: this.playerName,
      compName: newComp.newCompName,
      startChamps: this.createChampionsArray(
        newComp.champions,
        newComp.extraChampions
      ),
      tier: newComp.tier,
    };
    // console.log(data);
    console.log(form.form.value);
    this.httpRequestsService.addComp(data).subscribe((res) => console.log(res));
  }

  onCloseWindow() {
    this.closeWindow.emit(true);
  }

  submitMatchWithNewComp(form: Form | any) {
    const newComp = form.form.value.newComp;
    const data = {
      playerName: this.playerName,
      compName: newComp.newCompName,
      startChamps: this.createChampionsArray(
        newComp.champions,
        newComp.extraChampions
      ),
      tier: newComp.tier,
    };
    // console.log(data);
    // console.log(form.form.value);
    this.httpRequestsService.addComp(data).subscribe((res) => {
      if (res.ok) {
        this.httpRequestsService
          .createMatch(
            newComp.win,
            newComp.lp,
            newComp.newCompName,
            this.playerName
          )
          .subscribe((res) => console.log("createMatch", res));
        this.onCloseWindow();
      }
    });
  }
}
