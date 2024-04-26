import { trigger, transition, style, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { DataStorageService } from "../../shared/data-storage.service";
import { ButtonsStateService } from "../../shared/buttons-state.service";
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHandler,
} from "@angular/common/http";

@Component({
  selector: "app-player-profile",
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: "./player-confirm.component.html",
  styleUrl: "./player-confirm.component.css",
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("0.5s", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("0.5s", style({ opacity: 0 }))]),
    ]),
  ],
  providers: [HttpClient],
})
export class PlayerConfirmComponent implements OnInit {
  name: string;
  league: string;
  tier: number;
  lp: number;
  isLoading: boolean = false;
  response: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private buttonService: ButtonsStateService,
    private http: HttpClient,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.queryParams["name"];
    this.league = this.route.snapshot.queryParams["league"];
    this.tier = this.route.snapshot.queryParams["tier"];
    this.lp = this.route.snapshot.queryParams["lp"];
  }

  cancelForm() {
    this.router.navigate(["welcome"]);
    this.buttonService.setState("open");
  }

  submitForm() {
    this.dataStorageService
      .addPost(this.name, this.league, this.tier, this.lp)
      .subscribe({
        next: (success) => console.log(success.ok),
        error: (error) => console.error(error.error.DES),
        complete: () => console.info("complete"),
      });
  }
}
