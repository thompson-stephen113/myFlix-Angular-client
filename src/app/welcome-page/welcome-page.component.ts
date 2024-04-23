import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { LoginComponent } from "../login/login.component";
import { RegistrationComponent } from "../registration/registration.component";


@Component({
	// Defines custom HTML element
	selector: "welcome-page",

	templateUrl: "./welcome-page.component.html",
	styleUrl: "./welcome-page.component.css"
})

export class WelcomePageComponent implements OnInit {
	/**
	 * @constructor
	 * @param {MatDialog} dialog - The service for opening dialogs.
	 */
	constructor(
		public dialog: MatDialog
	) { };

	// Initializes component
	ngOnInit(): void {
	};

	/**
	 * Opens a dialog when the Sign Up button is clicked
	 * @function
	 * @name registerUser
	 */
	registerUser(): void {
		this.dialog.open(RegistrationComponent, {
			width: "280px"
		});
	};

	/**
	 * Opens a dialog when the Login button is clicked
	 * @function
	 * @name loginUser
	 */
	loginUser(): void {
		this.dialog.open(LoginComponent, {
			width: "280px"
		});
	};
};
