import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";

@Component({
	// Defines component as app root
	selector: "app-root",

	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css"
})
export class AppComponent {
	title = "myFlix-Angular-client";

	// Passes a dialog as an argument so it can be used in this component
	constructor(public dialog: MatDialog) { }

	// Opens a dialog when the Sign Up button is clicked
	openUserRegistrationDialog(): void {
		this.dialog.open(RegistrationComponent, {
			width: "280px"
		});
	};

	// Opens a dialog when the Login button is clicked
	openUserLoginDialog(): void {
		this.dialog.open(LoginComponent, {
			width: "280px"
		});
	};
};
