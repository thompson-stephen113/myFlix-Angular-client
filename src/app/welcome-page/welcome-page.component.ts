import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { LoginComponent } from "../login/login.component";
import { RegistrationComponent } from "../registration/registration.component";
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
	selector: "app-welcome-page",
	templateUrl: "./welcome-page.component.html",
	styleUrl: "./welcome-page.component.css"
})
export class WelcomePageComponent implements OnInit {
	// Passes a dialog as an argument so it can be used in this component
	constructor(public dialog: MatDialog) { }

	ngOnInit(): void {
	}

	// Opens a dialog when the Sign Up button is clicked
	registerUser(): void {
		this.dialog.open(RegistrationComponent, {
			width: "280px"
		});
	};

	// Opens a dialog when the Login button is clicked
	loginUser(): void {
		this.dialog.open(LoginComponent, {
			width: "280px"
		});
	};

	// Opens a dialog when the All Movies button is clicked
	openMoviesDialog(): void {
		this.dialog.open(MovieCardComponent, {
			width: "500px"
		});
	};
};
