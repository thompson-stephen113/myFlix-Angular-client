import { Component, OnInit, Input } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
	// Defines custom HTML element
	selector: "login-form",

	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css"
})

export class LoginComponent implements OnInit {
	// Defines the component's input
	@Input() userData = { Username: "", Password: "" };

	/**
	 * @constructor
	 * @param {FetchApiDataService} fetchApiData - The service that fetches data from the API.
	 * @param {MatDialogRef<LoginComponent>} dialogRef - The service that opens the login dialog.
	 * @param {MatSnackBar} snackBar - The service that displays notifications.
	 * @param {Router} router - The service for route navigation.
	 */
	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<LoginComponent>,
		public snackBar: MatSnackBar,
		public router: Router
	) { }

	// Initializes component
	ngOnInit(): void {
	}

	/**
	 * Logs existing users in
	 * @function
	 * @name loginUser
	 * @returns Message "Login successful."
	 * @returns Message "Incorrect credentials."
	 */
	loginUser(): void {
		this.fetchApiData.userLogin(this.userData).subscribe((response) => {
			// Logic for successful user login
			localStorage.setItem("user", JSON.stringify(response.user));
			localStorage.setItem("token", response.token);
			this.dialogRef.close();
			console.log(response);

			// Opens dialog
			this.snackBar.open("Login successful.", "OK", {
				duration: 2000
			});

			// Navigates to "movies" route
			this.router.navigate(["movies"]);
		}, (response) => {
			console.log(response);

			// Opens dialog
			this.snackBar.open("Incorrect credentials.", "OK", {
				duration: 2000
			});
		});
	};
};
