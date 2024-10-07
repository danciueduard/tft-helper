import {
  trigger,
  transition,
  style,
  animate,
  state,
} from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router, RouterModule } from "@angular/router";
import { HttpRequestsService } from "../../../shared/http-requests.service";
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHandler,
} from "@angular/common/http";

@Component({
  selector: "app-confirm-profile",
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
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
    trigger("progress", [
      transition(":enter", [
        style({ width: "0px" }),
        animate("3s", style({ width: "500px" })),
      ]),
    ]),
  ],
  providers: [HttpClient],
})
export class PlayerConfirmComponent implements OnInit {
  name: string;
  league: string;
  leagueTier: number;
  lp: number;

  isLoading: boolean = false;
  submitMessage: {
    valid: boolean;
    message: string | null;
  } = {
    valid: true,
    message: null,
  };
  validForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dataStorageService: HttpRequestsService
  ) {}

  ngOnInit(): void {
    this.validForm = this.route.snapshot.parent?.data["validForm"];
    this.name = this.route.snapshot.queryParams["name"];
    this.league = this.route.snapshot.queryParams["league"];
    this.leagueTier = this.route.snapshot.queryParams["tier"];
    this.lp = this.route.snapshot.queryParams["lp"];
  }

  cancelForm() {
    this.router.navigate(["welcome"]);
  }

  // BUG! if username contains spaces, it will submit as valid and will not check if it already exists
  submitForm() {
    const nameWithoutSpaces = this.name.replace(/\s/g, "");
    // Just in case the name contains any spaces. Can cause bugs with backend interraction
    this.dataStorageService
      .addPost(nameWithoutSpaces, this.league, this.leagueTier, this.lp)
      .subscribe({
        next: (success) => {
          this.submitMessage.valid = true;
          this.submitMessage.message = "Profile created successfully";

          setTimeout(() => {
            this.router.navigate(["/load"]);
          }, 3000);
        },
        error: (error) => {
          this.submitMessage.valid = false;
          if (!error.error.DES) {
            this.submitMessage.message = "An error has been occured";
          } else this.submitMessage.message = error.error.DES;
          setTimeout(() => {
            this.router.navigate(["/new"]);
          }, 1500);
        },
        complete: () => console.info("complete"),
      });
  }
}

