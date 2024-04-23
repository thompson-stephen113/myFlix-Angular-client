import { Component, OnInit, Input } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
	// Defines custom HTML element
	selector: "registration-form",

	templateUrl: "./registration.component.html",
	styleUrl: "./registration.component.css"
})

export class RegistrationComponent implements OnInit {
	// Defines the component's input
	@Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

	/**
	 * @constructor
	 * @param {FetchApiDataService} fetchApiData - The service that fetches data from the API.
	 * @param {MatDialogRef<RegistrationComponent>} dialogRef - The service that opens the registration dialog.
	 * @param {MatSnackBar} snackBar - The service that displays notifications.
	 */
	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<RegistrationComponent>,
		public snackBar: MatSnackBar
	) { }

	// Initializes component
	ngOnInit(): void {
	}

	/**
	 * Allows new users to register
	 * @function
	 * @name registerUser
	 * @returns Message "User registered successfully."
	 */
	registerUser(): void {
		this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
			this.dialogRef.close();
			console.log(response);

			// Opens dialog
			this.snackBar.open("User registered successfully.", "OK", {
				duration: 2000
			});
		}, (response) => {
			console.log(response);

			// Opens dialog
			this.snackBar.open(response, "OK", {
				duration: 2000
			});
		});
	};
};
